import { useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const [month, setMonth] = useState('')
  const [day, setDay] = useState('')
  const [year, setYear] = useState('')

  const monthNum = Number(month)
  const dayNum = Number(day)
  const yearNum = Number(year)

  const [americanDate, setAmericanDate] = useState<string | null>(null)
  const [europeanDate, setEuropeanDate] = useState<string | null>(null)

  const americanHexCode = `#${month}${day}${year}`
  const europeanHexCode = `#${day}${month}${year}`

  const handleDateCalculation = () => {
    const americanDate = month.toString() + day.toString() + year.toString()
    const europeanDate = day.toString() + month.toString() + year.toString()

    setAmericanDate(americanDate)
    setEuropeanDate(europeanDate)
  }

  const isPrime = () => {
    if (americanDate === null || europeanDate === null) {return false}

    for (let i = 2; i < Number(americanDate); i++) {
      if (Number(americanDate) % i === 0) {return "isn't prime"}
    }

    return "is prime"
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

    
  }

  const isArmstrongNumber = () => {
    if (americanDate === null || europeanDate === null) {return false}

    const numbers = americanDate.split("")

    let armstrongSum = numbers.reduce((acc, num) => {
      return acc + Math.pow(parseInt(num), numbers.length)
    }, 0)

    if (armstrongSum === Number(americanDate)) {return true}

    else {return false}
  }

  const isMathEquation = () => {
    // Day + Month = Year
    // Day - Month = Year
    // Day * Month = Year
    // Day / Month = Year
    // Day ^ Month = Year

    if (dayNum + monthNum === yearNum) {return `${dayNum} + ${monthNum} = ${yearNum}!`}
    else if (dayNum - monthNum === yearNum) {return `${dayNum} - ${monthNum} = ${yearNum}!`}
    else if (dayNum / monthNum === yearNum) {return `${dayNum} / ${monthNum} = ${yearNum}!`}
    else if (dayNum * monthNum === yearNum) {return `${dayNum} * ${monthNum} = ${yearNum}!`}
    else if (dayNum ** monthNum === yearNum) {return `${dayNum}^${monthNum} = ${yearNum}!`}

    else {return false}
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
          <Text style={styles.patternTitle}>Prime: {isPrime()}</Text>

          <Text>{isPrime() && `${americanDate}`}</Text>
        </View>

        <View>
          <Text style={styles.patternTitle}>Palindrome: {isPalindrome()}</Text>

          <Text>{isPalindrome() && "Yes"}</Text>
        </View>

        <View>
          <Text style={styles.patternTitle}>Pythagorean: {isPythagorean()}</Text>

          <Text>{isPythagorean() && `${americanDate}`}</Text>
        </View>

        <View>
          <Text style={styles.patternTitle}>Armstrong Number: {isArmstrongNumber()}</Text>

          <Text>{isArmstrongNumber() && `${americanDate}`}</Text>
        </View>

        <View>
          <Text style={styles.patternTitle}>Math Equations: {isMathEquation()}</Text>

          <Text>{isMathEquation() && `${americanDate}`}</Text>
        </View>

        <View>
          <Text style={styles.colorTitle}>
            American Hex Code: <Text style={{backgroundColor: americanHexCode}}>{americanHexCode}</Text>
            European Hex Code: <Text style={{backgroundColor: europeanHexCode}}>{europeanHexCode}</Text>
          </Text>
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
  patternContainer: {
  },
  colorContainer: {
    display: "flex",
    justifyContent: "space-between"
  },
  color: {
    margin: 5
  },
  patternTitle: {
    fontSize: 20,
    marginLeft: 10,
  },
  colorTitle: {
    fontSize: 20,
    margin: "auto",
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
