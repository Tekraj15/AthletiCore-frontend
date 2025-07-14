import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { Edit, Trash2 } from "lucide-react-native";

interface DropdownMenuProps {
  visible: boolean;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
  position: { x: number; y: number };
}

export default function DropdownMenu({
  visible,
  onClose,
  onEdit,
  onDelete,
  position,
}: DropdownMenuProps) {
  if (!visible) return null;

  return (
    <Modal transparent visible={visible} animationType="fade">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={{ flex: 1 }}>
          <View
            style={{
              position: "absolute",
              top: position.y + 10,
              right: 20,
              backgroundColor: "white",
              borderRadius: 8,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 5,
              minWidth: 120,
              overflow: "hidden",
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 16,
                paddingVertical: 12,
                borderBottomWidth: 1,
                borderBottomColor: "#f0f0f0",
              }}
              onPress={() => {
                onEdit();
                onClose();
              }}
            >
              <Edit size={16} color="#6B7280" style={{ marginRight: 8 }} />
              <Text style={{ color: "#374151", fontSize: 14 }}>Edit</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 16,
                paddingVertical: 12,
              }}
              onPress={() => {
                onDelete();
                onClose();
              }}
            >
              <Trash2 size={16} color="#EF4444" style={{ marginRight: 8 }} />
              <Text style={{ color: "#EF4444", fontSize: 14 }}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
} 