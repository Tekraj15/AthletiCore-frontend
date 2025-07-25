import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Dimensions,
  SafeAreaView
} from 'react-native';
import Svg, { Rect, Ellipse, Circle, Text as SvgText, G, Defs, LinearGradient, Stop, RadialGradient } from 'react-native-svg';

const SCREEN_WIDTH = Dimensions.get('window').width;

// Weight plates 
const STANDARD_PLATES = [
  { weight: 25, color: '#D32F2F', name: 'Red' },
  { weight: 20, color: '#1976D2', name: 'Blue' },
  { weight: 15, color: '#FBC02D', name: 'Yellow' },
  { weight: 10, color: '#388E3C', name: 'Green' },
  { weight: 5, color: '#FFFFFF', name: 'White', border: '#B0BEC5' },
  { weight: 2.5, color: '#9E9E9E', name: 'Silver', border: '#757575' },
  { weight: 1.25, color: '#616161', name: 'Dark Silver', border: '#424242' },
  { weight: 0.5, color: '#212121', name: 'Black', border: '#111' },
];

const BARBELL_WEIGHT = 20;
const COLLAR_WEIGHT = 2.5;

// Type for SVG plate
interface PlateConfig {
  weight: number;
  color: string;
  name: string;
  border?: string;
}

export default function BarbellVisualizer() {
  const [targetWeight, setTargetWeight] = useState('100');

  const plateConfiguration = React.useMemo(() => {
    const weight = parseFloat(targetWeight) || 0;
    const plateWeight = (weight - BARBELL_WEIGHT - (COLLAR_WEIGHT * 2)) / 2;
    if (plateWeight <= 0) return [];
    const plates: PlateConfig[] = [];
    let remainingWeight = plateWeight;
    const sortedPlates = [...STANDARD_PLATES].sort((a, b) => b.weight - a.weight);
    for (const plate of sortedPlates) {
      while (remainingWeight >= plate.weight - 0.001) {
        plates.push(plate);
        remainingWeight -= plate.weight;
        remainingWeight = Math.round(remainingWeight * 100) / 100;
      }
    }
    return plates;
  }, [targetWeight]);

  const actualWeight = React.useMemo(() => {
    const platesWeight = plateConfiguration.reduce((sum, plate) => sum + plate.weight, 0) * 2;
    return BARBELL_WEIGHT + (COLLAR_WEIGHT * 2) + platesWeight;
  }, [plateConfiguration]);

  const eachSideWeight = React.useMemo(() => {
    return plateConfiguration.reduce((sum, plate) => sum + plate.weight, 0);
  }, [plateConfiguration]);

  const plateBreakdown = plateConfiguration.length
    ? plateConfiguration.map(p => `${p.weight}kg`).join(' + ')
    : 'No plates';

  // SVG Drawing 
  const svgWidth = Math.min(SCREEN_WIDTH * 0.9, 500); 
  const svgHeight = Math.min(svgWidth * 0.15, 80); 
  const barY = svgHeight / 2;

  const scale = svgWidth / 500;
  const sleeveLength = 30 * scale;
  const sleeveRadius = 10 * scale;
  const barRadius = 4 * scale;
  const collarRadius = 8 * scale;
  const plateGap = 2 * scale;

  const margin = svgWidth * 0.1;
  const leftStart = margin;
  const rightStart = svgWidth - margin;
  let leftX = leftStart;
  let rightX = rightStart;

  const baseSizes = { 25: 42, 20: 38, 15: 34, 10: 30, 5: 26, 2.5: 22, 1.25: 18, 0.5: 14 };
  const sizeMap = Object.entries(baseSizes).reduce((acc, [weight, size]) => ({
    ...acc,
    [Number(weight)]: size * scale
  }), {} as Record<number, number>);

  const leftPlates = [...plateConfiguration].reverse();
  const rightPlates = plateConfiguration;

  // 3D/Gradient Plate Rendering 
  const renderSVGPlate = (plate: PlateConfig, idx: number, side: 'left' | 'right') => {
    const size = sizeMap[plate.weight as keyof typeof sizeMap] || 14 * scale;
    const color = plate.color;
    const border = plate.border || '#222';
    const x = side === 'left' ? (leftX += (size / 2 + plateGap)) : (rightX -= (size / 2 + plateGap));
    const gradId = `plateGrad${color.replace('#', '')}${idx}${side}`;
    const shineId = `plateShine${color.replace('#', '')}${idx}${side}`;
    return (
      <G key={side + idx}>
        <Defs>
          <RadialGradient id={gradId} cx="50%" cy="45%" r="60%">
            <Stop offset="0%" stopColor="#fff" stopOpacity="0.8" />
            <Stop offset="30%" stopColor={color} stopOpacity="0.95" />
            <Stop offset="80%" stopColor={color} stopOpacity="1" />
            <Stop offset="100%" stopColor="#222" stopOpacity="0.8" />
          </RadialGradient>
          <RadialGradient id={shineId} cx="40%" cy="30%" r="60%">
            <Stop offset="0%" stopColor="#fff" stopOpacity="0.7" />
            <Stop offset="60%" stopColor="transparent" stopOpacity="0" />
          </RadialGradient>
        </Defs>
        <Ellipse cx={x} cy={barY + size / 10} rx={size / 2.1} ry={size / 7} fill="#222" opacity={0.18} />
        <Circle cx={x} cy={barY} r={size / 2} fill={`url(#${gradId})`} stroke={border} strokeWidth={1.5 * scale} />
        <Ellipse cx={x - size / 8} cy={barY - size / 8} rx={size / 4} ry={size / 10} fill={`url(#${shineId})`} opacity={0.7} />
        <Circle cx={x} cy={barY} r={size / 8} fill="#e0e0e0" stroke="#888" strokeWidth={scale} />
        <SvgText x={x} y={barY + size / 10} textAnchor="middle" fontSize={size / 2.0} fontWeight="bold" fill={color === '#FFFFFF' ? '#000' : '#fff'} stroke={color === '#FFFFFF' ? 'transparent' : '#fff'} strokeWidth={0.6 * scale} >
          {plate.weight}
        </SvgText>
      </G>
    );
  };

  // 3D/Gradient Collar Rendering 
  const renderSVGCollar = (x: number, show: boolean) => (
    show ? (
      <G>
        <Defs>
          <RadialGradient id="collarGrad" cx="50%" cy="50%" r="60%">
            <Stop offset="0%" stopColor="#fff" stopOpacity="0.8" />
            <Stop offset="60%" stopColor="#e0e0e0" stopOpacity="1" />
            <Stop offset="100%" stopColor="#bfc2c4" stopOpacity="1" />
          </RadialGradient>
        </Defs>
        <Ellipse cx={x} cy={barY} rx={collarRadius} ry={collarRadius} fill="url(#collarGrad)" stroke="#a0a0a0" strokeWidth={scale} />
        <Ellipse cx={x - 1 * scale} cy={barY - 1 * scale} rx={collarRadius - 2 * scale} ry={collarRadius - 2 * scale} fill="none" stroke="#fff" strokeWidth={scale} opacity={0.7} />
      </G>
    ) : null
  );

  const barGradId = 'barGrad';
  const sleeveGradId = 'sleeveGrad';

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.header}>Barbell Plate Visualizer</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="e.g. 100"
              placeholderTextColor="#999"
              keyboardType="numeric"
              value={targetWeight}
              onChangeText={setTargetWeight}
            />
            <Text style={styles.inputUnit}>kg</Text>
          </View>

          <View style={styles.visualizerContainer}>
            <Text style={styles.plateBreakdown}>{plateBreakdown}</Text>
            <Svg width={svgWidth} height={svgHeight}>
              <Defs>
                <LinearGradient id={barGradId} x1="0" y1="0" x2="1" y2="0">
                  <Stop offset="0%" stopColor="#e0e0e0" />
                  <Stop offset="50%" stopColor="#b0b0b0" />
                  <Stop offset="100%" stopColor="#e0e0e0" />
                </LinearGradient>
                <LinearGradient id={sleeveGradId} x1="0" y1="0" x2="1" y2="0">
                  <Stop offset="0%" stopColor="#bbb" />
                  <Stop offset="100%" stopColor="#888" />
                </LinearGradient>
              </Defs>
              <Rect x={leftStart - sleeveLength} y={barY - sleeveRadius} width={sleeveLength} height={sleeveRadius * 2} rx={sleeveRadius} fill={`url(#${sleeveGradId})`} stroke="#888" strokeWidth={scale} />
              <Rect x={rightStart} y={barY - sleeveRadius} width={sleeveLength} height={sleeveRadius * 2} rx={sleeveRadius} fill={`url(#${sleeveGradId})`} stroke="#888" strokeWidth={scale} />
              <Rect x={leftStart} y={barY - barRadius} width={rightStart - leftStart} height={barRadius * 2} rx={barRadius} fill={`url(#${barGradId})`} stroke="#a0a0a0" strokeWidth={scale} />
              {renderSVGCollar(leftStart, leftPlates.length > 0)}
              {renderSVGCollar(rightStart, rightPlates.length > 0)}
              {leftPlates.map((plate, idx) => renderSVGPlate(plate, idx, 'left'))}
              {rightPlates.map((plate, idx) => renderSVGPlate(plate, idx, 'right'))}
            </Svg>
          </View>

          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Total Weight</Text>
              <Text style={styles.summaryValue}>{actualWeight.toFixed(2)} kg</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Each Side (Plates)</Text>
              <Text style={styles.summaryValue}>{eachSideWeight.toFixed(2)} kg</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Barbell</Text>
              <Text style={styles.summaryValue}>{BARBELL_WEIGHT} kg</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Collars</Text>
              <Text style={styles.summaryValue}>{COLLAR_WEIGHT * 2} kg</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f4f4f8',
  },
  container: {
    padding: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
    color: '#1a1a1a',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  input: {
    flex: 1,
    fontSize: 18,
    paddingVertical: 12,
    color: '#1a1a1a',
  },
  inputUnit: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6b7280',
  },
  visualizerContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  plateBreakdown: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4b5563',
    marginBottom: 12,
    textAlign: 'center',
  },
  summaryContainer: {
    marginTop: 16,
    borderTopWidth: 1,
    borderColor: '#e5e7eb',
    paddingTop: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#4b5563',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
});