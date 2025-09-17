import { useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const [month, setMonth] = useState('')
  const [day, setDay] = useState('')
  const [year, setYear] = useState('')

  const monthNum = parseInt(month)
  const dayNum = parseInt(day)
  const yearNum = parseInt(year)

  const [americanDate, setAmericanDate] = useState<string | null>(null)
  const [europeanDate, setEuropeanDate] = useState<string | null>(null)

  const handleDateCalculation = () => {
    const americanDate = month.toString() + day.toString() + year.toString()
    const europeanDate = day.toString() + month.toString() + year.toString()

    setAmericanDate(americanDate)
    setEuropeanDate(europeanDate)
  }

   const isPalindrome = () => {
    if (americanDate === null || europeanDate === null) {return false}

    const americanDateReversed = americanDate.split("").reverse().join("")
    const europeanDateReversed = europeanDate.split("").reverse().join("")

    if (americanDate.toString() === americanDateReversed) {return `${americanDate}`}

    else if (europeanDate.toString() === europeanDateReversed) {return `${europeanDate}`}
  }

  const isPythagorean = () => {
    if (dayNum**2 + monthNum**2 === yearNum**2) {return true}

    else {return false}
  }

  const isPerfectPower = () => {
    if (americanDate === null || europeanDate === null) {return false}

    for (let i = 2; i++; i <= 9) {
      if (Math.pow(parseInt(americanDate), 1/i) % 1 === 0) {return "WOOHOO"}
    }
  }

  return (
    <SafeAreaView>
      <ScrollView>
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

        <Text style={styles.subTitle}>Results:</Text>

        <View>
          <Text style={styles.patternTitle}>Number: {isPalindrome()}</Text>

          <Text>{isPalindrome() && "Yes"}</Text>
        </View>

        <View>
          <Text style={styles.patternTitle}>Number: {isPythagorean()}</Text>

          <Text>{isPythagorean() && `${americanDate}`}</Text>
        </View>

        <View>
          <Text style={styles.patternTitle}>Number: {isPerfectPower()}</Text>

          <Text>{isPerfectPower() && `${americanDate}`}</Text>
        </View>

      </ScrollView>
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
  subTitle: {
    fontSize: 25,
    margin: "auto",
    marginVertical: 15
  },
  patternTitle: {
    fontSize: 20,
    marginLeft: 10,
  },
  patternContainer: {
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
    marginBottom: 20
  },
  button: {
    maxWidth: 20
  },
});
