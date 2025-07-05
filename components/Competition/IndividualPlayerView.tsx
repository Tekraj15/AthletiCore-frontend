import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { ChevronDown, User, Trophy } from 'lucide-react-native';

interface IndividualPlayerViewProps {
  colors: any;
}

// Sample data for demonstration
const samplePlayers = [
  {
    id: '1',
    name: 'John Smith',
    data: {
      squat: {
        attempt1: { weight: 180, ipfgl: 85.2 },
        attempt2: { weight: 190, ipfgl: 89.8 },
        attempt3: { weight: 200, ipfgl: 94.5 },
        total: 89.8,
      },
      benchPress: {
        attempt1: { weight: 120, ipfgl: 78.4 },
        attempt2: { weight: 125, ipfgl: 81.7 },
        attempt3: { weight: 130, ipfgl: 85.0 },
        total: 85.0,
      },
      deadlift: {
        attempt1: { weight: 220, ipfgl: 95.1 },
        attempt2: { weight: 230, ipfgl: 99.4 },
        attempt3: { weight: 240, ipfgl: 103.7 },
        total: 103.7,
      },
      overallTotal: 278.5,
    },
  },
  {
    id: '2',
    name: 'Mike Johnson',
    data: {
      squat: {
        attempt1: { weight: 160, ipfgl: 78.4 },
        attempt2: { weight: 170, ipfgl: 83.2 },
        attempt3: { weight: 175, ipfgl: 85.7 },
        total: 85.7,
      },
      benchPress: {
        attempt1: { weight: 110, ipfgl: 72.1 },
        attempt2: { weight: 115, ipfgl: 75.4 },
        attempt3: { weight: 120, ipfgl: 78.7 },
        total: 78.7,
      },
      deadlift: {
        attempt1: { weight: 200, ipfgl: 87.3 },
        attempt2: { weight: 210, ipfgl: 91.7 },
        attempt3: { weight: 215, ipfgl: 93.9 },
        total: 93.9,
      },
      overallTotal: 258.3,
    },
  },
];

export default function IndividualPlayerView({ colors }: IndividualPlayerViewProps) {
  const [selectedPlayer, setSelectedPlayer] = useState(samplePlayers[0]);
  const [showPlayerDropdown, setShowPlayerDropdown] = useState(false);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Player Selection */}
      <View style={[styles.header, { backgroundColor: colors.surface }]}>
        <Text style={[styles.title, { color: colors.onSurface }]}>Individual Player View</Text>
        
        <TouchableOpacity
          style={[styles.playerSelector, { backgroundColor: colors.surfaceVariant, borderColor: colors.border }]}
          onPress={() => setShowPlayerDropdown(!showPlayerDropdown)}
        >
          <User size={20} color={colors.primary} />
          <Text style={[styles.playerSelectorText, { color: colors.onSurface }]}>
            {selectedPlayer.name}
          </Text>
          <ChevronDown 
            size={20} 
            color={colors.onSurfaceVariant}
            style={{
              transform: [{ rotate: showPlayerDropdown ? '180deg' : '0deg' }]
            }}
          />
        </TouchableOpacity>

        {showPlayerDropdown && (
          <View style={[styles.dropdown, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            {samplePlayers.map((player) => (
              <TouchableOpacity
                key={player.id}
                style={[
                  styles.dropdownOption,
                  { borderBottomColor: colors.border },
                  selectedPlayer.id === player.id && { backgroundColor: colors.surfaceVariant }
                ]}
                onPress={() => {
                  setSelectedPlayer(player);
                  setShowPlayerDropdown(false);
                }}
              >
                <Text style={[styles.dropdownOptionText, { color: colors.onSurface }]}>
                  {player.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {/* Results Table */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.tableContainer}>
          {/* Table Header */}
          <View style={[styles.tableHeader, { backgroundColor: colors.surfaceVariant }]}>
            <View style={[styles.attemptColumn, styles.headerCell]}>
              <Text style={[styles.headerText, { color: colors.onSurface }]}>Attempts/IPFGL</Text>
            </View>
            <View style={[styles.exerciseColumn, styles.headerCell]}>
              <Text style={[styles.headerText, { color: colors.onSurface }]}>Squat</Text>
            </View>
            <View style={[styles.exerciseColumn, styles.headerCell]}>
              <Text style={[styles.headerText, { color: colors.onSurface }]}>Bench Press</Text>
            </View>
            <View style={[styles.exerciseColumn, styles.headerCell]}>
              <Text style={[styles.headerText, { color: colors.onSurface }]}>Deadlift</Text>
            </View>
            <View style={[styles.totalColumn, styles.headerCell]}>
              <Trophy size={16} color={colors.warning} />
              <Text style={[styles.headerText, { color: colors.onSurface }]}>Overall IPFGL</Text>
            </View>
          </View>

          {/* Attempt 1 Weight */}
          <View style={[styles.tableRow, { backgroundColor: colors.surface }]}>
            <View style={[styles.attemptColumn, styles.cell]}>
              <Text style={[styles.attemptLabel, { color: colors.onSurfaceVariant }]}>Attempt 1 Weight</Text>
            </View>
            <View style={[styles.exerciseColumn, styles.cell]}>
              <Text style={[styles.cellText, { color: colors.onSurface }]}>
                {selectedPlayer.data.squat.attempt1.weight}kg
              </Text>
            </View>
            <View style={[styles.exerciseColumn, styles.cell]}>
              <Text style={[styles.cellText, { color: colors.onSurface }]}>
                {selectedPlayer.data.benchPress.attempt1.weight}kg
              </Text>
            </View>
            <View style={[styles.exerciseColumn, styles.cell]}>
              <Text style={[styles.cellText, { color: colors.onSurface }]}>
                {selectedPlayer.data.deadlift.attempt1.weight}kg
              </Text>
            </View>
            <View style={[styles.totalColumn, styles.cell]}>
              <Text style={[styles.totalText, { color: colors.primary }]}>
                {(selectedPlayer.data.squat.attempt1.ipfgl + 
                  selectedPlayer.data.benchPress.attempt1.ipfgl + 
                  selectedPlayer.data.deadlift.attempt1.ipfgl).toFixed(1)}
              </Text>
            </View>
          </View>

          {/* Attempt 1 IPFGL */}
          <View style={[styles.tableRow, { backgroundColor: colors.surfaceVariant }]}>
            <View style={[styles.attemptColumn, styles.cell]}>
              <Text style={[styles.attemptLabel, { color: colors.onSurfaceVariant }]}>Attempt 1 IPFGL</Text>
            </View>
            <View style={[styles.exerciseColumn, styles.cell]}>
              <Text style={[styles.ipfglText, { color: colors.primary }]}>
                {selectedPlayer.data.squat.attempt1.ipfgl}
              </Text>
            </View>
            <View style={[styles.exerciseColumn, styles.cell]}>
              <Text style={[styles.ipfglText, { color: colors.primary }]}>
                {selectedPlayer.data.benchPress.attempt1.ipfgl}
              </Text>
            </View>
            <View style={[styles.exerciseColumn, styles.cell]}>
              <Text style={[styles.ipfglText, { color: colors.primary }]}>
                {selectedPlayer.data.deadlift.attempt1.ipfgl}
              </Text>
            </View>
            <View style={[styles.totalColumn, styles.cell]} />
          </View>

          {/* Attempt 2 Weight */}
          <View style={[styles.tableRow, { backgroundColor: colors.surface }]}>
            <View style={[styles.attemptColumn, styles.cell]}>
              <Text style={[styles.attemptLabel, { color: colors.onSurfaceVariant }]}>Attempt 2 Weight</Text>
            </View>
            <View style={[styles.exerciseColumn, styles.cell]}>
              <Text style={[styles.cellText, { color: colors.onSurface }]}>
                {selectedPlayer.data.squat.attempt2.weight}kg
              </Text>
            </View>
            <View style={[styles.exerciseColumn, styles.cell]}>
              <Text style={[styles.cellText, { color: colors.onSurface }]}>
                {selectedPlayer.data.benchPress.attempt2.weight}kg
              </Text>
            </View>
            <View style={[styles.exerciseColumn, styles.cell]}>
              <Text style={[styles.cellText, { color: colors.onSurface }]}>
                {selectedPlayer.data.deadlift.attempt2.weight}kg
              </Text>
            </View>
            <View style={[styles.totalColumn, styles.cell]}>
              <Text style={[styles.totalText, { color: colors.primary }]}>
                {(selectedPlayer.data.squat.attempt2.ipfgl + 
                  selectedPlayer.data.benchPress.attempt2.ipfgl + 
                  selectedPlayer.data.deadlift.attempt2.ipfgl).toFixed(1)}
              </Text>
            </View>
          </View>

          {/* Attempt 2 IPFGL */}
          <View style={[styles.tableRow, { backgroundColor: colors.surfaceVariant }]}>
            <View style={[styles.attemptColumn, styles.cell]}>
              <Text style={[styles.attemptLabel, { color: colors.onSurfaceVariant }]}>Attempt 2 IPFGL</Text>
            </View>
            <View style={[styles.exerciseColumn, styles.cell]}>
              <Text style={[styles.ipfglText, { color: colors.primary }]}>
                {selectedPlayer.data.squat.attempt2.ipfgl}
              </Text>
            </View>
            <View style={[styles.exerciseColumn, styles.cell]}>
              <Text style={[styles.ipfglText, { color: colors.primary }]}>
                {selectedPlayer.data.benchPress.attempt2.ipfgl}
              </Text>
            </View>
            <View style={[styles.exerciseColumn, styles.cell]}>
              <Text style={[styles.ipfglText, { color: colors.primary }]}>
                {selectedPlayer.data.deadlift.attempt2.ipfgl}
              </Text>
            </View>
            <View style={[styles.totalColumn, styles.cell]} />
          </View>

          {/* Attempt 3 Weight */}
          <View style={[styles.tableRow, { backgroundColor: colors.surface }]}>
            <View style={[styles.attemptColumn, styles.cell]}>
              <Text style={[styles.attemptLabel, { color: colors.onSurfaceVariant }]}>Attempt 3 Weight</Text>
            </View>
            <View style={[styles.exerciseColumn, styles.cell]}>
              <Text style={[styles.cellText, { color: colors.onSurface }]}>
                {selectedPlayer.data.squat.attempt3.weight}kg
              </Text>
            </View>
            <View style={[styles.exerciseColumn, styles.cell]}>
              <Text style={[styles.cellText, { color: colors.onSurface }]}>
                {selectedPlayer.data.benchPress.attempt3.weight}kg
              </Text>
            </View>
            <View style={[styles.exerciseColumn, styles.cell]}>
              <Text style={[styles.cellText, { color: colors.onSurface }]}>
                {selectedPlayer.data.deadlift.attempt3.weight}kg
              </Text>
            </View>
            <View style={[styles.totalColumn, styles.cell]}>
              <Text style={[styles.totalText, { color: colors.primary }]}>
                {(selectedPlayer.data.squat.attempt3.ipfgl + 
                  selectedPlayer.data.benchPress.attempt3.ipfgl + 
                  selectedPlayer.data.deadlift.attempt3.ipfgl).toFixed(1)}
              </Text>
            </View>
          </View>

          {/* Attempt 3 IPFGL */}
          <View style={[styles.tableRow, { backgroundColor: colors.surfaceVariant }]}>
            <View style={[styles.attemptColumn, styles.cell]}>
              <Text style={[styles.attemptLabel, { color: colors.onSurfaceVariant }]}>Attempt 3 IPFGL</Text>
            </View>
            <View style={[styles.exerciseColumn, styles.cell]}>
              <Text style={[styles.ipfglText, { color: colors.primary }]}>
                {selectedPlayer.data.squat.attempt3.ipfgl}
              </Text>
            </View>
            <View style={[styles.exerciseColumn, styles.cell]}>
              <Text style={[styles.ipfglText, { color: colors.primary }]}>
                {selectedPlayer.data.benchPress.attempt3.ipfgl}
              </Text>
            </View>
            <View style={[styles.exerciseColumn, styles.cell]}>
              <Text style={[styles.ipfglText, { color: colors.primary }]}>
                {selectedPlayer.data.deadlift.attempt3.ipfgl}
              </Text>
            </View>
            <View style={[styles.totalColumn, styles.cell]} />
          </View>

          {/* Total IPFGL */}
          <View style={[styles.tableRow, styles.totalRow, { backgroundColor: colors.primary + '20' }]}>
            <View style={[styles.attemptColumn, styles.cell]}>
              <Text style={[styles.totalLabel, { color: colors.primary }]}>Total IPFGL</Text>
            </View>
            <View style={[styles.exerciseColumn, styles.cell]}>
              <Text style={[styles.totalText, { color: colors.primary }]}>
                {selectedPlayer.data.squat.total}
              </Text>
            </View>
            <View style={[styles.exerciseColumn, styles.cell]}>
              <Text style={[styles.totalText, { color: colors.primary }]}>
                {selectedPlayer.data.benchPress.total}
              </Text>
            </View>
            <View style={[styles.exerciseColumn, styles.cell]}>
              <Text style={[styles.totalText, { color: colors.primary }]}>
                {selectedPlayer.data.deadlift.total}
              </Text>
            </View>
            <View style={[styles.totalColumn, styles.cell]}>
              <Text style={[styles.grandTotalText, { color: colors.primary }]}>
                {selectedPlayer.data.overallTotal}
              </Text>
            </View>
          </View>
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
    position: 'relative',
  },
  title: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    marginBottom: 16,
  },
  playerSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    gap: 12,
  },
  playerSelectorText: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  dropdown: {
    position: 'absolute',
    top: 80,
    left: 16,
    right: 16,
    borderWidth: 1,
    borderRadius: 12,
    maxHeight: 200,
    zIndex: 1000,
  },
  dropdownOption: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  dropdownOptionText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  tableContainer: {
    minWidth: 600,
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
  totalRow: {
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderTopColor: '#E5E7EB',
  },
  headerCell: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  cell: {
    paddingVertical: 16,
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  attemptColumn: {
    width: 140,
    alignItems: 'flex-start',
  },
  exerciseColumn: {
    width: 120,
  },
  totalColumn: {
    width: 120,
  },
  headerText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    textAlign: 'center',
  },
  attemptLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    textAlign: 'left',
  },
  cellText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
  },
  ipfglText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    textAlign: 'center',
  },
  totalText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    textAlign: 'center',
  },
  totalLabel: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    textAlign: 'left',
  },
  grandTotalText: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    textAlign: 'center',
  },
});