import { useAuth } from "@/context/AuthContext"
import { router } from "expo-router"
import { ArrowLeft, Eye, EyeOff, Lock, Mail, User } from "lucide-react-native"
import React, { useState } from "react"
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function RegisterScreen() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { register } = useAuth()

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs")
      return
    }

    if (!email.includes("@")) {
      Alert.alert("Erreur", "Veuillez entrer une adresse email valide")
      return
    }

    if (password.length < 6) {
      Alert.alert(
        "Erreur",
        "Le mot de passe doit contenir au moins 6 caractères"
      )
      return
    }

    if (password !== confirmPassword) {
      Alert.alert("Erreur", "Les mots de passe ne correspondent pas")
      return
    }

    setIsLoading(true)

    try {
      const success = await register(name, email, password)

      if (success) {
        Alert.alert("Succès", "Compte créé avec succès !", [
          { text: "OK", onPress: () => router.replace("/(tabs)") },
        ])
      } else {
        Alert.alert(
          "Erreur",
          "Une erreur est survenue lors de la création du compte"
        )
      }
    } catch {
      Alert.alert(
        "Erreur",
        "Une erreur est survenue lors de l&apos;inscription"
      )
    } finally {
      setIsLoading(false)
    }
  }

  const goToLogin = () => {
    router.back()
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Back Button */}
          <TouchableOpacity style={styles.backButton} onPress={goToLogin}>
            <ArrowLeft size={24} color="#1E293B" />
          </TouchableOpacity>

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Créer un compte</Text>
            <Text style={styles.subtitle}>Rejoignez notre communauté</Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* Name Input */}
            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <User size={20} color="#64748B" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Nom complet"
                  placeholderTextColor="#94A3B8"
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                  autoCorrect={false}
                />
              </View>
            </View>

            {/* Email Input */}
            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <Mail size={20} color="#64748B" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Adresse email"
                  placeholderTextColor="#94A3B8"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <Lock size={20} color="#64748B" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Mot de passe"
                  placeholderTextColor="#94A3B8"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeIcon}
                >
                  {showPassword ? (
                    <EyeOff size={20} color="#64748B" />
                  ) : (
                    <Eye size={20} color="#64748B" />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            {/* Confirm Password Input */}
            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <Lock size={20} color="#64748B" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Confirmer le mot de passe"
                  placeholderTextColor="#94A3B8"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showConfirmPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={styles.eyeIcon}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} color="#64748B" />
                  ) : (
                    <Eye size={20} color="#64748B" />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            {/* Register Button */}
            <TouchableOpacity
              style={[
                styles.registerButton,
                isLoading && styles.registerButtonDisabled,
              ]}
              onPress={handleRegister}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#FFFFFF" size="small" />
              ) : (
                <Text style={styles.registerButtonText}>S&apos;inscrire</Text>
              )}
            </TouchableOpacity>

            {/* Terms */}
            <Text style={styles.termsText}>
              En vous inscrivant, vous acceptez nos{" "}
              <Text style={styles.termsLink}>
                Conditions d&apos;utilisation
              </Text>{" "}
              et notre{" "}
              <Text style={styles.termsLink}>Politique de confidentialité</Text>
            </Text>

            {/* Login Link */}
            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Déjà un compte ? </Text>
              <TouchableOpacity onPress={goToLogin}>
                <Text style={styles.loginLink}>Se connecter</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  keyboardView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  backButton: {
    alignSelf: "flex-start",
    padding: 8,
    marginBottom: 16,
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#1E293B",
    marginBottom: 8,
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 16,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 24,
  },
  form: {
    gap: 16,
  },
  inputContainer: {
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    paddingHorizontal: 16,
    height: 56,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#1E293B",
    height: "100%",
  },
  eyeIcon: {
    padding: 4,
  },
  registerButton: {
    backgroundColor: "#3B82F6",
    borderRadius: 16,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#3B82F6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    marginTop: 8,
  },
  registerButtonDisabled: {
    opacity: 0.7,
  },
  registerButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },
  termsText: {
    fontSize: 12,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 18,
    marginTop: 16,
  },
  termsLink: {
    color: "#3B82F6",
    fontWeight: "600",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
  loginText: {
    fontSize: 14,
    color: "#64748B",
  },
  loginLink: {
    fontSize: 14,
    color: "#3B82F6",
    fontWeight: "700",
  },
})
