import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { CreditCard as Edit, Scale, Ruler } from 'lucide-react-native';

interface PlayerMeasurementsTableProps {
  colors: any;
  group: string;
}

// Sample data for demonstration
const sampleMeasurements = [
  {
    id: '1',
    playerName: 'John Smith',
    initialData: {
      height: '5\'10"',
      weight: 83.5,
      rackHeight: 42,
    },
    weighInData: {
      height: '5\'10"',
      weight: 82.8,
      rackHeight: 42,
    },
  },
  {
    id: '2',
    playerName: 'Mike Johnson',
    initialData: {
      height: '5\'8"',
      weight: 74.2,
      rackHeight: 38,
    },
    weighInData: {
      height: '5\'8"',
      weight: 73.9,
      rackHeight: 38,
    },
  },
  {
    id: '3',
    playerName: 'David Wilson',
    initialData: {
      height: '6\'2"',
      weight: 105.3,
      rackHeight: 46,
    },
    weighInData: {
      height: '6\'2"',
      weight: 104.7,
      rackHeight: 46,
    },
  },
];

export default function PlayerMeasurementsTable({ colors, group }: PlayerMeasurementsTableProps) {
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.surface }]}>
        <Text style={[styles.title, { color: colors.onSurface }]}>
          Player Measurements - Group {group}
        </Text>
        <Text style={[styles.subtitle, { color: colors.onSurfaceVariant }]}>
          Official weigh-in data is used for all calculations
        </Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.tableContainer}>
          {/* Table Header */}
          <View style={[styles.tableHeader, { backgroundColor: colors.surfaceVariant }]}>
            <View style={[styles.playerNameColumn, styles.headerCell]}>
              <Text style={[styles.headerText, { color: colors.onSurface }]}>Player Name</Text>
            </View>
            
            <View style={styles.dataGroup}>
              <View style={[styles.dataGroupHeader, { borderBottomColor: colors.border }]}>
                <Text style={[styles.dataGroupTitle, { color: colors.onSurface }]}>
                  Initial Registration
                </Text>
              </View>
              <View style={styles.dataColumns}>
                <View style={[styles.measurementColumn, styles.headerCell]}>
                  <Ruler size={16} color={colors.onSurfaceVariant} />
                  <Text style={[styles.headerText, { color: colors.onSurfaceVariant }]}>Height</Text>
                </View>
                <View style={[styles.measurementColumn, styles.headerCell]}>
                  <Scale size={16} color={colors.onSurfaceVariant} />
                  <Text style={[styles.headerText, { color: colors.onSurfaceVariant }]}>Weight</Text>
                </View>
                <View style={[styles.measurementColumn, styles.headerCell]}>
                  <Text style={[styles.headerText, { color: colors.onSurfaceVariant }]}>Rack Height</Text>
                </View>
              </View>
            </View>
            
            <View style={styles.dataGroup}>
              <View style={[styles.dataGroupHeader, { borderBottomColor: colors.border }]}>
                <Text style={[styles.dataGroupTitle, { color: colors.primary }]}>
                  Official Weigh-in
                </Text>
              </View>
              <View style={styles.dataColumns}>
                <View style={[styles.measurementColumn, styles.headerCell]}>
                  <Ruler size={16} color={colors.primary} />
                  <Text style={[styles.headerText, { color: colors.primary }]}>Height</Text>
                </View>
                <View style={[styles.measurementColumn, styles.headerCell]}>
                  <Scale size={16} color={colors.primary} />
                  <Text style={[styles.headerText, { color: colors.primary }]}>Weight</Text>
                </View>
                <View style={[styles.measurementColumn, styles.headerCell]}>
                  <Text style={[styles.headerText, { color: colors.primary }]}>Rack Height</Text>
                </View>
              </View>
            </View>
            
            <View style={[styles.actionColumn, styles.headerCell]}>
              <Text style={[styles.headerText, { color: colors.onSurface }]}>Actions</Text>
            </View>
          </View>

          {/* Table Rows */}
          {sampleMeasurements.map((player, index) => (
            <View 
              key={player.id} 
              style={[
                styles.tableRow, 
                { backgroundColor: index % 2 === 0 ? colors.surface : colors.surfaceVariant }
              ]}
            >
              <View style={[styles.playerNameColumn, styles.cell]}>
                <Text style={[styles.cellText, { color: colors.onSurface }]}>{player.playerName}</Text>
              </View>
              
              {/* Initial Registration Data */}
              <View style={styles.dataGroup}>
                <View style={styles.dataColumns}>
                  <View style={[styles.measurementColumn, styles.cell]}>
                    <Text style={[styles.cellText, { color: colors.onSurfaceVariant }]}>
                      {player.initialData.height}
                    </Text>
                  </View>
                  <View style={[styles.measurementColumn, styles.cell]}>
                    <Text style={[styles.cellText, { color: colors.onSurfaceVariant }]}>
                      {player.initialData.weight}kg
                    </Text>
                  </View>
                  <View style={[styles.measurementColumn, styles.cell]}>
                    <Text style={[styles.cellText, { color: colors.onSurfaceVariant }]}>
                      {player.initialData.rackHeight}"
                    </Text>
                  </View>
                </View>
              </View>
              
              {/* Official Weigh-in Data */}
              <View style={styles.dataGroup}>
                <View style={styles.dataColumns}>
                  <View style={[styles.measurementColumn, styles.cell]}>
                    <Text style={[styles.primaryText, { color: colors.onSurface }]}>
                      {player.weighInData.height}
                    </Text>
                  </View>
                  <View style={[styles.measurementColumn, styles.cell]}>
                    <Text style={[styles.primaryText, { color: colors.onSurface }]}>
                      {player.weighInData.weight}kg
                    </Text>
                  </View>
                  <View style={[styles.measurementColumn, styles.cell]}>
                    <Text style={[styles.primaryText, { color: colors.onSurface }]}>
                      {player.weighInData.rackHeight}"
                    </Text>
                  </View>
                </View>
              </View>
              
              <View style={[styles.actionColumn, styles.cell]}>
                <TouchableOpacity style={[styles.editButton, { backgroundColor: colors.primary }]}>
                  <Edit size={16} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  tableContainer: {
    minWidth: 700,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#E5E7EB',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerCell: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cell: {
    paddingVertical: 16,
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playerNameColumn: {
    width: 120,
    alignItems: 'flex-start',
  },
  dataGroup: {
    width: 240,
  },
  dataGroupHeader: {
    paddingVertical: 8,
    borderBottomWidth: 1,
  },
  dataGroupTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    textAlign: 'center',
  },
  dataColumns: {
    flexDirection: 'row',
  },
  measurementColumn: {
    width: 80,
    gap: 4,
  },
  actionColumn: {
    width: 80,
  },
  headerText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    textAlign: 'center',
  },
  cellText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
  },
  primaryText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    textAlign: 'center',
  },
  editButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});