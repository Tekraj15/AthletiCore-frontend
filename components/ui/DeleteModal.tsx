// components/DeleteModal.tsx
import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { theme } from "@/constants/theme";  // adjust path as needed

const { width } = Dimensions.get("window");
const colors = theme.dark;

interface DeleteModalProps {
  visible: boolean;
  title: string;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting?: boolean;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  visible,
  title,
  onClose,
  onConfirm,
  isDeleting = false,
}) => {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Delete {title}</Text>
          <Text style={styles.description}>
            Are you sure you want to delete this {title}? This action cannot be
            undone.
          </Text>
          <View style={styles.footer}>
            <TouchableOpacity
              onPress={onClose}
              style={styles.cancelButton}
              disabled={isDeleting}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onConfirm}
              style={[styles.deleteButton, isDeleting && styles.disabledButton]}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <ActivityIndicator size="small" color={colors.onSurface} />
              ) : (
                <Text style={styles.deleteText}>Delete</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteModal;


const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "#00000099", // semi-transparent black overlay can stay
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: width * 0.85,
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: colors.onSurface,
  },
  description: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
    marginBottom: 20,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
  },
  cancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: colors.surfaceVariant,
  },
  deleteButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: colors.error,
    minWidth: 80,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#f87171", // lighter red - you can define a lighter variant in colors if you want
  },
  cancelText: {
    color: colors.onSurfaceVariant,
    fontWeight: "600",
  },
  deleteText: {
    color: colors.onSurface,
    fontWeight: "600",
  },
});
