import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';



export default function HomeScreen() {
  const [month, setMonth] = useState('')
  const [day, setDay] = useState('')
  const [year, setYear] = useState('') 

  const [americanDate, setAmericanDate] = useState<number | null>(null)
  const [europeanDate, setEuropeanDate] = useState<number | null>(null)

  const handleDateCalculation = () => {
    const americanDate = parseInt(month.toString() + day.toString() + year.toString())
    const europeanDate = parseInt(day.toString() + month.toString() + year.toString())

    setAmericanDate(americanDate)
    setEuropeanDate(europeanDate)
  }

  return (
    <SafeAreaView>
        <Text style={styles.title}>Welcome to Perfect Date!</Text>

      <View style={styles.dateContainer}>
        

        <TextInput 
          placeholder='mm'
          keyboardType='numeric'
          style={styles.input}
          value={month}
          onChangeText={setMonth}
        />

        <TextInput 
          placeholder='dd'
          keyboardType='numeric'
          style={styles.input}
          value={day}
          onChangeText={setDay}
        />

        <TextInput 
          placeholder='yyyy'
          keyboardType='numeric'
          style={styles.input}
          value={year}
          onChangeText={setYear}
        />
      </View>

      <Button
      title='Calculate Your Perfect Date'
      onPress={handleDateCalculation}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  title: {
    fontSize: 30,
    margin: "auto",
    marginVertical: 20
  },
  stepContainer: {
    gap: 8,
    marginBottom: 10,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  input: {
    padding: 8,
    height:50,
    fontSize: 20,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: 'white',
    color: 'black',
  },
  dateContainer: {
    flex: 10,
    margin: "auto",
    flexDirection: "row",
    marginBottom: 80
  },
  button: {
    maxWidth: 20
  },
});
