import { Collapsible } from '@/components/Collapsible';
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
    if (americanDate === null || europeanDate === null) {return "ANGER"}

    for (let i = 2; i < Number(americanDate); i++) {
      if (Number(americanDate) % i === 0) {return "is not a prime number."}
    }

    return "is prime"
  }

   const isPalindrome = () => {
    if (americanDate === null || europeanDate === null) {return false}

    const americanDateReversed = americanDate.split("").reverse().join("")
    const europeanDateReversed = europeanDate.split("").reverse().join("")

    if (americanDate.toString() === americanDateReversed) {return `The American version of this date:${americanDate} is a palindrome.`}

    else if (europeanDate.toString() === europeanDateReversed) {return `The European version of this date:${europeanDate} is a palindrome`}

    else {return "This date is not a Palindrome."}
  }

  const isPythagorean = () => {
    if (dayNum**2 + monthNum**2 === yearNum**2) {return true}

    else {return false}
  }

  const isPerfectPower = () => {
    if (americanDate === null || europeanDate === null) {return false}

    for (let i = 2; i <= 9; i++) {
      if (Math.pow(Number(americanDate), 1/i) % 1 === 0) {return true}

      else if (Math.pow(Number(europeanDate), 1/i) % 1 === 0) {return true}
    }

    return false
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
    if (dayNum + monthNum === yearNum) {return `${dayNum} + ${monthNum} = ${yearNum}!`}
    else if (dayNum - monthNum === yearNum) {return `${dayNum} - ${monthNum} = ${yearNum}!`}
    else if (dayNum / monthNum === yearNum) {return `${dayNum} / ${monthNum} = ${yearNum}!`}
    else if (dayNum * monthNum === yearNum) {return `${dayNum} * ${monthNum} = ${yearNum}!`}
    else if (dayNum ** monthNum === yearNum) {return `${dayNum}^${monthNum} = ${yearNum}!`}

    else {return false}
  }

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.title}>Welcome to Perfect Date!</Text>

        <View style={styles.dateContainer}>

          <TextInput 
            placeholder='mm'
            keyboardType='numeric'
            style={styles.input}
            value={month}
            onChangeText={setMonth}
            maxLength={2}
          />

          <TextInput 
            placeholder='dd'
            keyboardType='numeric'
            style={styles.input}
            value={day}
            onChangeText={setDay}
            maxLength={2}
          />

          <TextInput 
            placeholder='yyyy'
            keyboardType='numeric'
            style={styles.input}
            value={year}
            onChangeText={setYear}
            maxLength={4}
          />
        </View>

        <Button
        title='Calculate Your Perfect Date'
        onPress={handleDateCalculation}
        />

        <Text style={styles.subTitle}>Results:</Text>

        <View style={styles.patternContainer}>

          <View style={styles.patternTitle}>
            <Collapsible title={`Prime: ${americanDate} ${isPrime()}`}>

              <Text>A prime number is a number that is only divisible by itself and 1. Example: 3 has no numbers (other than 1 and 3) that it can be divided by and result in a whole number.</Text>
            </Collapsible>
          </View>

          <View style={styles.patternTitle}>
            <Collapsible title={`Palindrome: ${isPalindrome()}`}>

            <Text>A palindrome is something that can be reversed and still read the same way. Example: &quot;racecar&quot; reversed is still &quot;racecar&quot;.</Text>
            </Collapsible>
          </View>

          <View style={styles.patternTitle}>
            <Collapsible title={`Perfect power: ${americanDate} ${isPerfectPower()}`}>

            <Text>A &quot;Perfect Power&quot; is a number that can be taken to the nth root where n is a number between 2 and 9. Examples: The square root (or 2nd root) of 9 is 3 because 3^2 = 9. The cubed root (or 3rd root) of 48 is 4 because 4^3 = 48.</Text>
            </Collapsible>
          </View>

          <View style={styles.patternTitle}>
            <Collapsible title={`Pythagorean: ${americanDate} ${isPythagorean()}`}>

            <Text>An equation is &quot;Pythagorean&quot; when a^2 + b^2 = c^2. For example, 3^2 + 4^2 = 5^2 (9 + 16 = 25). In regards to a date, we check if day^2 + month^2 = year^2.</Text>
            </Collapsible>
          </View>

          <View style={styles.patternTitle}>
            <Collapsible title={`Armstrong Number: ${americanDate} ${isArmstrongNumber()}`}>

            <Text>Armstrong Number: An &quot;Armstrong number&quot; is a number that is equal to the sum of its own digits each raised to the power of the number of digits. Example: 153 is an Armstrong number because it has 3 digits, and 1^3 + 5^3 + 3^3 = 1 + 125 + 27 = 153.</Text>
            </Collapsible>
          </View>

          <View style={styles.patternTitle}>
            <Collapsible title={`Math Equation: ${americanDate} ${isMathEquation()}`}>

            <Text>This checks if the date entered is a math equation. Example: 10/13/0130 would be a math equation 10 * 13 = 0130</Text>
            </Collapsible>
          </View>

          <View style={styles.patternTitle}>
          <Text style={styles.patternTitle}>
            American Hex Code: <Text style={{backgroundColor: americanHexCode}}>{americanHexCode}</Text>
          </Text>
          
          <View style={styles.patternTitle}>
            <Collapsible title="European Hex Code:">
              European Hex Code: <Text style={{backgroundColor: europeanHexCode}}>{europeanHexCode}</Text>
            </Collapsible>
          </View>
        </View>

          <Text style={styles.patternTitle}>
            American HSL Code:
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
  scrollView: {
    alignItems: "center",
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
    alignItems: "flex-start",
    width: "95%"
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
    marginBottom: 5
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
