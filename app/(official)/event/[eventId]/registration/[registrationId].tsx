import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import {
  X,
  CheckCircle,
  XCircle,
  Clock,
  Edit,
  Save,
  MessageSquare,
} from "lucide-react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useQueryClient } from "@tanstack/react-query";
import { styles } from "@/styles/registrationDetailStyles";
import { useUpdateFormFields } from "@/hooks/useUpdateFormFields";
import { useUpdateFinalStats } from "@/hooks/useUpdateFinalStats";
import { useGetPlayerSubmissionDetail } from "@/hooks/useGetPlayerSubmissionById";

export default function RegistrationDetailScreen() {
  const { eventId, registrationId, mode, review } = useLocalSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [isEditing, setIsEditing] = useState(false);
  const [statusAction, setStatusAction] = useState<"approved" | "rejected">("approved");
  const [reviewComments, setReviewComments] = useState("");
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [editData, setEditData] = useState<Record<string, string>>({});

  const {
    data,
    isLoading,
    error,
  } = useGetPlayerSubmissionDetail(eventId as string, registrationId as string);

  const registration = data?.submission;

  const updateFormFieldsMutation = useUpdateFormFields();
  const updateStatusMutation = useUpdateFinalStats();

  useEffect(() => {
    if (registration?.formFields) {
      const dynamicForm: Record<string, string> = {};
      registration.formFields.forEach((field) => {
        dynamicForm[field.key] = field.value;
      });
      setEditData(dynamicForm);
    }
  }, [registration]);

  useEffect(() => {
    // Automatically enable edit or review based on URL params
    if (mode === "edit") {
      setIsEditing(true);
    }
    if (review === "true") {
      setShowStatusModal(true);
    }
  }, [mode, review]);

  const handleSave = () => {
    if (!registration) return;

    updateFormFieldsMutation.mutate(
      {
        submissionId: registration._id,
        data: {
          formFields: Object.keys(editData).map((key) => ({
            key,
            value: editData[key],
          })),
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["submission-detail", eventId, registrationId],
          });
          setIsEditing(false);
        },
        onError: (err) => console.error(err),
      }
    );
  };

  const handleStatusChange = () => {
    if (!registration) return;

    updateStatusMutation.mutate(
      {
        submissionId: registration._id,
        data: {
          status: statusAction,
          comments: reviewComments,
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["submission-detail", eventId, registrationId],
          });
          setShowStatusModal(false);
        },
        onError: (err) => console.error(err),
      }
    );
  };

  const renderStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle size={20} color="green" />;
      case "rejected":
        return <XCircle size={20} color="red" />;
      default:
        return <Clock size={20} color="orange" />;
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.overlay}>
        <ActivityIndicator size="large" color="#2563EB" />
      </SafeAreaView>
    );
  }

  if (error || !registration) {
    return (
      <SafeAreaView style={styles.overlay}>
        <Text style={{ color: "red" }}>Failed to load registration.</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={{ color: "blue", marginTop: 10 }}>Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.overlay}>
      <View style={styles.modalContainer}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Registration Details</Text>
          {renderStatusIcon(registration.status)}
          <TouchableOpacity onPress={() => router.back()}>
            <X size={20} color="gray" />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Form Responses</Text>
            {registration.formFields.map((field, index) => (
              <View key={field.key + index} style={styles.inputGroup}>
                {isEditing ? (
                  <TextInput
                    style={styles.input}
                    value={editData[field.key] || ""}
                    onChangeText={(text) =>
                      setEditData({ ...editData, [field.key]: text })
                    }
                    placeholder={`Field ${index + 1}`}
                  />
                ) : (
                  <Text style={styles.infoText}>
                    <Text style={{ fontWeight: "bold" }}>{`Field ${index + 1}`}: </Text>
                    {field.value}
                  </Text>
                )}
              </View>
            ))}
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
                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                  <Save size={16} color="white" />
                  <Text style={styles.saveText}>
                    {updateFormFieldsMutation.isPending ? "Saving..." : "Save"}
                  </Text>
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

        {showStatusModal && (
          <View style={styles.statusOverlay}>
            <View style={styles.statusModal}>
              <Text style={styles.statusTitle}>Update Status</Text>
              <View style={styles.statusButtons}>
                <TouchableOpacity
                  style={
                    statusAction === "approved"
                      ? styles.activeAccept
                      : styles.inactive
                  }
                  onPress={() => setStatusAction("approved")}
                >
                  <Text style={styles.statusText}>Approve</Text>
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
                    statusAction === "approved"
                      ? styles.acceptButton
                      : styles.rejectButton
                  }
                  onPress={handleStatusChange}
                >
                  <Text style={styles.confirmText}>
                    {statusAction === "approved" ? "Approve" : "Reject"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
