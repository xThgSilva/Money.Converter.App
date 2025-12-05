import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button } from './src/components/Button';
import { styles } from './App.styles';
import { currencies } from "./src/constants/currencies";
import { Input } from './src/components/input';
import { ResultCard } from './src/components/ResultCard';
import { exchangeRateApi } from './src/services/api';
import { convertCurrency } from "./src/utils/utils"
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export default function App() {
  const [amount, setAmount] = useState();
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('BRL');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [exchangeRate, setExchangeRate] = useState(null);

  async function fetchExchangeRate() {
    try {
      setLoading(true)
      if (!amount) return

      const data = await exchangeRateApi(fromCurrency)
      const rate = data.conversion_rates[toCurrency];
      setExchangeRate(rate);
      const convertedAmount = convertCurrency(amount, rate);
      console.log(convertedAmount)
      setResult(convertedAmount);
    }
    catch (error) {
      alert("Erro, tente novamente.")
    }
    finally {
      setLoading(false)
    }
  }

  function swapCurrency() {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setResult('')
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS == "ios" ? "padding" : "height"}
    >
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <StatusBar style="light" />

          <View style={styles.header}>
            <Text style={styles.title}>
              Conversor de Moedas
            </Text>
            <Text style={styles.subTitle}>
              Converta valores entre diferentes
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.label}>De: </Text>
            <View style={styles.currencyGrid}>
              {currencies.map(c => (
                <Button
                  variant='primary'
                  key={c.code}
                  currency={c.code}
                  onPress={() => setFromCurrency(c.code)}
                  isSelected={fromCurrency == c.code}
                />
              ))}
            </View>

            <Input
              label={"Valor:"}
              value={amount}
              onChangeText={setAmount}
            />

            <TouchableOpacity style={styles.swapButton} onPress={() => swapCurrency()}>
              <Ionicons style={styles.swapButtonText} name="swap-vertical" size={32} color="white" />
            </TouchableOpacity>

            <Text style={styles.label}>Para:</Text>
            <View style={styles.currencyGrid}>
              {currencies.map(c => (
                <Button
                  variant='secondary'
                  key={c.code}
                  currency={c.code}
                  onPress={() => setToCurrency(c.code)}
                  isSelected={toCurrency == c.code}
                />
              ))}
            </View>
          </View>

          {loading ? (
            <ActivityIndicator color={"white"} />
          ) : (
            <TouchableOpacity
              style={[styles.convertButton, (!amount || loading) && styles.convertButtonDisable]}
              onPress={fetchExchangeRate}
              disabled={!amount || loading}
            >
              <Text style={styles.swapButtonText}> Converter </Text>
            </TouchableOpacity>
          )}

          <ResultCard
            exchangeRate={exchangeRate}
            result={result}
            fromCurrency={fromCurrency}
            toCurrency={toCurrency}
            currencies={currencies}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}