import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

export default function App() {
  const [userNumber, setUserNumber] = useState('');
  const [output, setOutput] = useState('');
  const [reading, setReading] = useState(false);
  const [started, setStarted] = useState(false);
  const [finalReveal, setFinalReveal] = useState('');

  const steps = [
    "🔌 Connecting to your neurons...",
    "🧠 Scanning brainwave frequencies...",
    "📶 Decoding thought signals...",
    "🔄 Matching patterns with global psychic database...",
    "💡 Calculating...",
"⏳ Almost there...",
    "🔍 Finalizing the mind read...",
  ];

  const startMindReading = () => {
    if (!userNumber || isNaN(userNumber)) {
      setOutput("😅 Please enter a valid number between 1 and 100!");
      return;
    }

    setReading(true);
    setStarted(true);
    setFinalReveal('');
    setOutput('');

    let currentStep = 0;

    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setOutput(prev => prev + steps[currentStep] + '\n\n');
        currentStep++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setFinalReveal(userNumber);
          setReading(false);
        }, 1000);
      }
    }, 1000);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.title}>Mind Reader</Text>

      {!started && (
        <>
          <Text style={styles.prompt}>Think of a number between 1 and 100, I will read your mind</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your number here"
            placeholderTextColor="#555"
            keyboardType="numeric"
            value={userNumber}
            onChangeText={setUserNumber}
            editable={!reading}
          />
          <TouchableOpacity
            onPress={startMindReading}
            disabled={reading}
            style={styles.button}
          >
            <Text style={styles.buttonText}>
              {reading ? 'Reading...' : 'Read My Mind'}
            </Text>
          </TouchableOpacity>
        </>
      )}

      {started && (
        <>
          <ScrollView style={styles.outputBox}>
            <Text style={styles.outputText}>{output}</Text>
          </ScrollView>

          {finalReveal !== '' && (
            <View style={styles.revealContainer}>
              <Text style={styles.revealText}>{finalReveal}</Text>
              <Text style={styles.revealSub}>🎉 Success!That's your number, right? 🔮</Text>
            </View>
          )}
        </>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#111',
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    color: '#0f0',
    fontWeight: 'bold',
    marginBottom: 30,
  },
  prompt: {
    fontSize: 18,
    color: '#0f0',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#222',
    color: '#0f0',
    borderWidth: 1,
    borderColor: '#0f0',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 18,
    width: '100%',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#0f0',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  outputBox: {
    maxHeight: 300,
    width: '100%',
    marginBottom: 20,
  },
  outputText: {
    color: '#0f0',
    fontSize: 16,
    fontFamily: 'monospace',
  },
  revealContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  revealText: {
    fontSize: 60,
    color: '#00ff00',
    fontWeight: 'bold',
    textShadowColor: '#0f0',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
  },
  revealSub: {
    color: '#0f0',
    fontSize: 18,
    marginTop: 10,
  },
});
