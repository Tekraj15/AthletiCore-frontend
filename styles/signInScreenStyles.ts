import { StyleSheet } from "react-native";
import { theme } from "@/constants/theme";

const colors = theme.dark;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    backgroundColor: colors.background,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.onSurface,
    textAlign: "center",
    marginBottom: 16,
  },
  input: {
    backgroundColor: colors.surface,
    color: colors.onSurface,
    borderRadius: 8,
    padding: 16,
    marginBottom: 4,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 4,
  },
  passwordInput: {
    flex: 1,
    color: colors.onSurface,
    paddingVertical: 16,
  },
  errorText: {
    color: colors.error,
    marginBottom: 8,
  },
  spacer: {
    marginBottom: 8,
  },
  rememberForgotContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  rememberButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: colors.surfaceVariant,
    borderRadius: 8,
  },
  rememberText: {
    color: colors.onSurface,
    fontWeight: "600",
  },
  forgotText: {
    color: colors.onSurface,
    fontWeight: "600",
  },
  loginButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  loginText: {
    textAlign: "center",
    color: colors.onSurface,
    fontWeight: "bold",
    fontSize: 18,
  },
  signUpText: {
    textAlign: "center",
    color: colors.onSurfaceVariant,
    marginTop: 8,
  },
  signUpLink: {
    color: colors.onSurface,
    fontWeight: "600",
    textDecorationLine: "underline",
  },
});
