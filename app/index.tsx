import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dropdown } from 'react-native-element-dropdown';


const { width, height } = Dimensions.get('window');

const CurrencyConverterScreen = () => {
  const [amount, setAmount] = useState('');
  const [sourceCurrency, setSourceCurrency] = useState('USD');
  const [targetCurrency, setTargetCurrency] = useState('EUR');
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [conversionResult, setConversionResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch available currencies
    fetch('https://open.er-api.com/v6/latest/USD')
      .then((response) => response.json())
      .then((data) => {
        const filteredCurrencies = Object.keys(data.rates).filter(
          (currency) => currency !== 'ALL'
        ); // Remove "ALL" if present
        setCurrencies(filteredCurrencies);
      })
      .catch(() => Alert.alert('Error', 'Failed to fetch currencies.'));
  }, []);

  const convertCurrency = () => {
    if (!amount || isNaN(Number(amount))) {
      Alert.alert('Invalid Input', 'Please enter a valid amount.');
      return;
    }

    setLoading(true);
    fetch(`https://open.er-api.com/v6/latest/${sourceCurrency}`)
      .then((response) => response.json())
      .then((data) => {
        const rate = data.rates[targetCurrency];
        const result = (Number(amount) * rate).toFixed(2);
        setConversionResult(`${amount} ${sourceCurrency} = ${result} ${targetCurrency}`);
        setLoading(false);
      })
      .catch(() => {
        Alert.alert('Error', 'Failed to fetch exchange rates.');
        setLoading(false);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Currency Converter</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter amount"
        placeholderTextColor="#888"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      <View style={styles.pickerContainer}>

        <Text style={styles.label}>From:</Text>

        <Dropdown
          style={styles.dropdown}
          containerStyle={styles.dropdownContainer} // Add dark background to dropdown list
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          itemTextStyle={styles.itemTextStyle}
          inputSearchStyle={styles.searchInputStyle}
          data={currencies.map((currency) => ({
            label: currency,
            value: currency,
          }))}
          search
          searchPlaceholder="Search..."
          labelField="label"
          valueField="value"
          placeholder="Select a currency"
          value={sourceCurrency}
          onChange={(item) => setSourceCurrency(item.value)}
          activeColor='#00796B'
          autoScroll={true}
        />
      </View>

      <View style={styles.pickerContainer}>

        <Text style={styles.label}>To:</Text>

        <Dropdown
          style={styles.dropdown}
          containerStyle={styles.dropdownContainer} // Add dark background to dropdown list
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          itemTextStyle={styles.itemTextStyle}
          inputSearchStyle={styles.searchInputStyle}
          data={currencies.map((currency) => ({
            label: currency,
            value: currency,
          }))}
          search
          searchPlaceholder="Search..."
          labelField="label"
          valueField="value"
          placeholder="Select a currency"
          value={targetCurrency}
          onChange={(item) => setTargetCurrency(item.value)}
          activeColor='#00796B'
          autoScroll={true}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={convertCurrency}>
        <Text style={styles.buttonText}>Convert</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#00ff00" />}

      {conversionResult && (
        <Text style={styles.result}>
          {conversionResult}
        </Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.05, // Responsive padding
    backgroundColor: '#1f1f1f',
  },
  title: {
    fontSize: width * 0.06, // Responsive font size
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: height * 0.02,
  },
  input: {
    backgroundColor: '#333',
    color: '#fff',
    padding: height * 0.02,
    borderRadius: 5,
    marginBottom: height * 0.02,
  },
  pickerContainer: {
    marginBottom: height * 0.02,
  },
  label: {
    color: '#fff',
    marginBottom: height * 0.01,
  },
  dropdown: {
    backgroundColor: '#333',
    borderColor: '#444',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: width * 0.03,
    height: height * 0.07, // Responsive height
  },
  placeholderStyle: {
    color: '#888',
    fontSize: width * 0.04,
  },
  selectedTextStyle: {
    color: '#fff',
    fontSize: width * 0.04,
  },
  button: {
    backgroundColor: '#6bb98a',
    padding: height * 0.02,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: width * 0.045,
  },
  dropdownContainer: {
    backgroundColor: '#333',
    borderColor: '#444',
    borderWidth: 1,
    borderRadius: 5,
  },

  itemTextStyle: {
    color: '#fff',
    fontSize: 16,
  },

  searchInputStyle: {
    backgroundColor: '#444',
    color: '#fff',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  result: {
    marginTop: height * 0.03,
    fontSize: width * 0.05,
    color: '#fff',
    textAlign: 'center',
    paddingVertical: height * 0.02,
    backgroundColor: '#333',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#444',
    marginHorizontal: width * 0.05,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default CurrencyConverterScreen;