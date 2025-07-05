import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import {
  X,
  CheckCircle,
  XCircle,
  Clock,
  Edit,
  Save,
  MessageSquare,
  User,
  Phone,
  Mail,
  Weight,
  Ruler,
  Target,
  Calendar,
  History,
} from "lucide-react-native";
import { Registration, RegistrationFormData } from "@/types/getRegistration";
import { styles } from "@/styles/registrationDetailStyles";

interface Props {
  registration: Registration;
  visible: boolean;
  currentUser: any; // 👈 Add this line

  onClose: () => void;
  onStatusUpdate: (
    id: string,
    status: "accepted" | "rejected",
    comments: string
  ) => void;
  onDataUpdate: (id: string, updates: Partial<RegistrationFormData>) => void;
}

const RegistrationDetailModal: React.FC<Props> = ({
  registration,
  visible,
  currentUser,
  onClose,
  onStatusUpdate,
  onDataUpdate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [statusAction, setStatusAction] = useState<"accepted" | "rejected">(
    "accepted"
  );
  const [reviewComments, setReviewComments] = useState("");
  const [showStatusModal, setShowStatusModal] = useState(false);

  const [editData, setEditData] = useState<Partial<RegistrationFormData>>({
    playerName: registration.playerName,
    age: registration.age,
    phone: registration.phone,
    height: registration.height,
    weight: registration.weight,
    rackHeight: registration.rackHeight,
    preferredPosition: registration.preferredPosition,
    experience: registration.experience,
    medicalConditions: registration.medicalConditions,
    emergencyContact: registration.emergencyContact,
    emergencyPhone: registration.emergencyPhone,
  });

  const handleSave = () => {
    onDataUpdate(registration.id, editData);
    setIsEditing(false);
  };

  const handleStatusChange = () => {
    onStatusUpdate(registration.id, statusAction, reviewComments);
    setShowStatusModal(false);
  };

  const renderStatusIcon = (status: string) => {
    switch (status) {
      case "accepted":
        return <CheckCircle size={20} color="green" />;
      case "rejected":
        return <XCircle size={20} color="red" />;
      default:
        return <Clock size={20} color="orange" />;
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Registration Details</Text>
            {renderStatusIcon(registration.status)}
            <TouchableOpacity onPress={onClose}>
              <X size={20} color="gray" />
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={styles.content}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Player Information</Text>
              <View style={styles.inputGroup}>
                <User size={20} color="gray" />
                {isEditing ? (
                  <TextInput
                    style={styles.input}
                    value={editData.playerName || ""}
                    onChangeText={(text) =>
                      setEditData({ ...editData, playerName: text })
                    }
                  />
                ) : (
                  <Text style={styles.infoText}>{registration.playerName}</Text>
                )}
              </View>
              <View style={styles.inputGroup}>
                <Mail size={20} color="gray" />
                <Text style={styles.infoText}>{registration.playerEmail}</Text>
              </View>
              <View style={styles.inputGroup}>
                <Calendar size={20} color="gray" />
                {isEditing ? (
                  <TextInput
                    style={styles.input}
                    keyboardType="number-pad"
                    value={editData.age?.toString() || ""}
                    onChangeText={(text) =>
                      setEditData({ ...editData, age: parseInt(text) || 0 })
                    }
                  />
                ) : (
                  <Text style={styles.infoText}>{registration.age} years</Text>
                )}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Contact Details</Text>
              <View style={styles.inputGroup}>
                <Phone size={20} color="gray" />
                {isEditing ? (
                  <TextInput
                    style={styles.input}
                    value={editData.phone || ""}
                    onChangeText={(text) =>
                      setEditData({ ...editData, phone: text })
                    }
                  />
                ) : (
                  <Text style={styles.infoText}>{registration.phone}</Text>
                )}
              </View>
            </View>

            <View style={styles.actions}>
              {isEditing ? (
                <>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => setIsEditing(false)}
                  >
                    <Text style={styles.cancelText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.saveButton}
                    onPress={handleSave}
                  >
                    <Save size={16} color="white" />
                    <Text style={styles.saveText}>Save</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => setIsEditing(true)}
                >
                  <Edit size={16} color="white" />
                  <Text style={styles.editText}>Edit</Text>
                </TouchableOpacity>
              )}
              {registration.status === "pending" && (
                <TouchableOpacity
                  style={styles.reviewButton}
                  onPress={() => setShowStatusModal(true)}
                >
                  <MessageSquare size={16} color="white" />
                  <Text style={styles.reviewText}>Review</Text>
                </TouchableOpacity>
              )}
            </View>
          </ScrollView>

          {/* Status Update Modal */}
          {showStatusModal && (
            <View style={styles.statusOverlay}>
              <View style={styles.statusModal}>
                <Text style={styles.statusTitle}>Update Status</Text>
                <View style={styles.statusButtons}>
                  <TouchableOpacity
                    style={
                      statusAction === "accepted"
                        ? styles.activeAccept
                        : styles.inactive
                    }
                    onPress={() => setStatusAction("accepted")}
                  >
                    <Text style={styles.statusText}>Accept</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={
                      statusAction === "rejected"
                        ? styles.activeReject
                        : styles.inactive
                    }
                    onPress={() => setStatusAction("rejected")}
                  >
                    <Text style={styles.statusText}>Reject</Text>
                  </TouchableOpacity>
                </View>
                <TextInput
                  style={styles.commentBox}
                  value={reviewComments}
                  onChangeText={setReviewComments}
                  placeholder="Write comments..."
                  multiline
                />
                <View style={styles.modalActions}>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => setShowStatusModal(false)}
                  >
                    <Text style={styles.cancelText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={
                      statusAction === "accepted"
                        ? styles.acceptButton
                        : styles.rejectButton
                    }
                    onPress={handleStatusChange}
                  >
                    <Text style={styles.confirmText}>
                      {statusAction === "accepted" ? "Accept" : "Reject"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default RegistrationDetailModal;
