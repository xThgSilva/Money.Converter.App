import { Text, View } from "react-native";
import { styles } from "./styles";
import { currencies } from "../../constants/currencies";

export function ResultCard({ exchangeRate, result, fromCurrency, toCurrency }) {
    if (!result || !exchangeRate)
        return null

    const toSymbol = currencies.find(c => c.code === toCurrency).symbol;

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Resultado: </Text>
            <Text style={styles.amount}>{toSymbol} {result}</Text>
            <Text style={styles.rate}>Taxa de Câmbio: 1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}</Text>
        </View>
    )
}