import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { CircleCheck as CheckCircle, Circle as XCircle, CreditCard as Edit } from 'lucide-react-native';

interface GameResultsTableProps {
  colors: any;
  event: string;
  group: string;
}

// Sample data for demonstration
const sampleResults = [
  {
    id: '1',
    playerName: 'John Smith',
    attempts: [
      { weight: 180, ipfgl: 85.2, status: 'success' },
      { weight: 190, ipfgl: 89.8, status: 'success' },
      { weight: 200, ipfgl: 94.5, status: 'fail' },
    ],
    overallIPFGL: 89.8,
  },
  {
    id: '2',
    playerName: 'Mike Johnson',
    attempts: [
      { weight: 160, ipfgl: 78.4, status: 'success' },
      { weight: 170, ipfgl: 83.2, status: 'success' },
      { weight: 175, ipfgl: 85.7, status: 'success' },
    ],
    overallIPFGL: 85.7,
  },
  {
    id: '3',
    playerName: 'David Wilson',
    attempts: [
      { weight: 220, ipfgl: 98.1, status: 'success' },
      { weight: 230, ipfgl: 102.5, status: 'fail' },
      { weight: 235, ipfgl: 104.8, status: 'fail' },
    ],
    overallIPFGL: 98.1,
  },
];

export default function GameResultsTable({ colors, event, group }: GameResultsTableProps) {
  const getEventName = (event: string) => {
    switch (event) {
      case 'S': return 'Squat';
      case 'BP': return 'Bench Press';
      case 'D': return 'Deadlift';
      default: return event;
    }
  };

  const renderStatusIcon = (status: string) => {
    if (status === 'success') {
      return <CheckCircle size={16} color={colors.success} />;
    } else {
      return <XCircle size={16} color={colors.error} />;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.surface }]}>
        <Text style={[styles.title, { color: colors.onSurface }]}>
          {getEventName(event)} Results - Group {group}
        </Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.tableContainer}>
          {/* Table Header */}
          <View style={[styles.tableHeader, { backgroundColor: colors.surfaceVariant }]}>
            <View style={[styles.playerNameColumn, styles.headerCell]}>
              <Text style={[styles.headerText, { color: colors.onSurface }]}>Player Name</Text>
            </View>
            
            {[1, 2, 3].map((attemptNum) => (
              <View key={attemptNum} style={styles.attemptGroup}>
                <Text style={[styles.attemptHeader, { color: colors.onSurface }]}>
                  Attempt {attemptNum}
                </Text>
                <View style={styles.attemptColumns}>
                  <View style={[styles.weightColumn, styles.headerCell]}>
                    <Text style={[styles.headerText, { color: colors.onSurfaceVariant }]}>Weight</Text>
                  </View>
                  <View style={[styles.ipfglColumn, styles.headerCell]}>
                    <Text style={[styles.headerText, { color: colors.onSurfaceVariant }]}>IPFGL</Text>
                  </View>
                  <View style={[styles.statusColumn, styles.headerCell]}>
                    <Text style={[styles.headerText, { color: colors.onSurfaceVariant }]}>Status</Text>
                  </View>
                </View>
              </View>
            ))}
            
            <View style={[styles.overallColumn, styles.headerCell]}>
              <Text style={[styles.headerText, { color: colors.onSurface }]}>Overall IPFGL</Text>
            </View>
            
            <View style={[styles.actionColumn, styles.headerCell]}>
              <Text style={[styles.headerText, { color: colors.onSurface }]}>Actions</Text>
            </View>
          </View>

          {/* Table Rows */}
          {sampleResults.map((player, index) => (
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
              
              {player.attempts.map((attempt, attemptIndex) => (
                <View key={attemptIndex} style={styles.attemptGroup}>
                  <View style={styles.attemptColumns}>
                    <View style={[styles.weightColumn, styles.cell]}>
                      <Text style={[styles.cellText, { color: colors.onSurface }]}>
                        {attempt.weight}kg
                      </Text>
                    </View>
                    <View style={[styles.ipfglColumn, styles.cell]}>
                      <Text style={[styles.cellText, { color: colors.onSurface }]}>
                        {attempt.ipfgl}
                      </Text>
                    </View>
                    <View style={[styles.statusColumn, styles.cell]}>
                      {renderStatusIcon(attempt.status)}
                    </View>
                  </View>
                </View>
              ))}
              
              <View style={[styles.overallColumn, styles.cell]}>
                <Text style={[styles.overallText, { color: colors.primary }]}>
                  {player.overallIPFGL}
                </Text>
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
  },
  tableContainer: {
    minWidth: 800,
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
  attemptGroup: {
    width: 180,
  },
  attemptHeader: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    textAlign: 'center',
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  attemptColumns: {
    flexDirection: 'row',
  },
  weightColumn: {
    width: 60,
  },
  ipfglColumn: {
    width: 60,
  },
  statusColumn: {
    width: 60,
  },
  overallColumn: {
    width: 100,
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
  overallText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
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