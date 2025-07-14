import * as Clipboard from "expo-clipboard"
import { Copy, Gift } from "lucide-react-native"
import React from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

type PromoCodeHintProps = {
  onCodeSelect: (code: string) => void
}

const PromoCodeHint = ({ onCodeSelect }: PromoCodeHintProps) => {
  const availableCodes = [
    { code: "WELCOME10", discount: 10, description: "Nouveau client" },
    { code: "SAVE20", discount: 20, description: "Promo spéciale" },
    { code: "FIRST15", discount: 15, description: "Premier achat" },
  ]

  const handleCopyCode = async (code: string) => {
    await Clipboard.setStringAsync(code)
    onCodeSelect(code)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Gift size={16} />
        <Text style={styles.headerText}>Codes disponibles</Text>
      </View>

      {availableCodes.map((item) => (
        <TouchableOpacity
          key={item.code}
          style={styles.codeItem}
          onPress={() => handleCopyCode(item.code)}
          activeOpacity={0.7}
        >
          <View style={styles.codeInfo}>
            <Text style={styles.codeText}>{item.code}</Text>
            <Text style={styles.descriptionText}>{item.description}</Text>
          </View>
          <View style={styles.rightSection}>
            <Text style={styles.discountText}>-{item.discount}%</Text>
            <Copy size={14} />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F8FAFC",
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  headerText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#3B82F6",
    marginLeft: 4,
  },
  codeItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 8,
    borderRadius: 6,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  codeInfo: {
    flex: 1,
  },
  codeText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#1F2937",
    fontFamily: "monospace",
  },
  descriptionText: {
    fontSize: 10,
    color: "#6B7280",
    marginTop: 1,
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  discountText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#10B981",
  },
})

export default PromoCodeHint
