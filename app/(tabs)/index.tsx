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

  const yearAbbreviated = year.slice(2, 4)

  const [americanDate, setAmericanDate] = useState<string | null>(null)
  const [europeanDate, setEuropeanDate] = useState<string | null>(null)

  const americanHexCode = `#${month}${day}${yearAbbreviated}`
  const europeanHexCode = `#${day}${month}${yearAbbreviated}`

  const americanHslCode = `hsl(${month}, ${day}%, ${yearAbbreviated}%)`
  const europeanHslCode = `hsl(${day}, ${month}%, ${yearAbbreviated}%)`

  const dayChange = (val: string) => {
    const numeric = val.replace(/[^0-9]/g, "")
    if (numeric === "") {
      setDay("");
      return
    } else {
      const num = parseInt(numeric, 10)
      if (num > 31) {return `${num} is not a valid number`}
      setDay(numeric)
    }
  }

  const monthChange = (val: string) => {
    const numeric = val.replace(/[^0-9]/g, "")
    if (numeric === "") {
      setMonth("");
      return
    } else {
      const num = parseInt(numeric, 10)
      if (num > 12) {return `${num} is not a valid number`}
      setMonth(numeric)
    }
  }

  const yearChange = (val: string) => {
    const numeric = val.replace(/[^0-9]/g, "")
    if (numeric === "") {
      setYear("");
      return
    } else {
      const num = parseInt(numeric, 10)
      if (num > 2500) {return `${num} is not a valid number`}
      setYear(numeric)
    }
  }

  const handleDateCalculation = () => {   
    const americanDate = month.toString() + day.toString() + year.toString()
    const europeanDate = day.toString() + month.toString() + year.toString()

    setAmericanDate(americanDate)
    setEuropeanDate(europeanDate)
  }

  const isPrime = () => {
    if (americanDate === null || europeanDate === null) {return ""}

    let americanCheck = true

    for (let i = 2; i < Number(americanDate); i++) {
      if (Number(americanDate) % i === 0) {americanCheck = false}
    }

    if (americanCheck) {return `The American version of this date: ${americanDate} is a prime number.`}

    else {
      for (let i = 2; i < Number(europeanDate); i++) {
        if (Number(europeanDate) % i === 0) {return "This date is not a prime number."}
      }

      return `The European version of this date: ${europeanDate} is a prime number.`
    }
  }

   const isPalindrome = () => {
    if (americanDate === null || europeanDate === null) {return false}

    const americanDateReversed = americanDate.split("").reverse().join("")
    const europeanDateReversed = europeanDate.split("").reverse().join("")

    if (americanDate.toString() === americanDateReversed) {return `The American version of this date: ${americanDate} is a palindrome.`}

    else if (europeanDate.toString() === europeanDateReversed) {return `The European version of this date: ${europeanDate} is a palindrome`}

    else {return "This date is not a Palindrome."}
  }

  const isPythagorean = () => {
    if (dayNum**2 + monthNum**2 === yearNum**2) {return "This date is Pythagorean."}

    else {return "This date is not Pythagorean."}
  }

  const isPerfectPower = () => {
    if (americanDate === null || europeanDate === null) {return false}

    for (let i = 2; i <= 9; i++) {
      if (Math.pow(Number(americanDate), 1/i) % 1 === 0) {return `The American version of this date:${americanDate} is a perfect power.`}

      else if (Math.pow(Number(europeanDate), 1/i) % 1 === 0) {return `The European version of this date:${europeanDate} is a perfect power.`}
    }

    return "This date is not a perfect power."
  }

  const isArmstrongNumber = () => {
    if (americanDate === null || europeanDate === null) {return "No date entered."}

    const numbers = americanDate.split("")

    let armstrongSum = numbers.reduce((acc, num) => {
      return acc + Math.pow(parseInt(num), numbers.length)
    }, 0)

    if (armstrongSum === Number(americanDate)) {return `${americanDate} is an Armstrong Number.`}

    else if (armstrongSum === Number(europeanDate)) {return `${europeanDate} is an Armstrong Number.`}

    else {return "This date is not an Armstrong number."}
  }

  const isMathEquation = () => {
    if (dayNum + monthNum === yearNum) {return `${dayNum} + ${monthNum} = ${yearNum}!`}
    else if (dayNum - monthNum === yearNum) {return `${dayNum} - ${monthNum} = ${yearNum}!`}
    else if (dayNum / monthNum === yearNum) {return `${dayNum} / ${monthNum} = ${yearNum}!`}
    else if (dayNum * monthNum === yearNum) {return `${dayNum} * ${monthNum} = ${yearNum}!`}
    else if (dayNum ** monthNum === yearNum) {return `${dayNum}^${monthNum} = ${yearNum}!`}

    else {return "This date does not have any applicable math equations."}
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
            onChangeText={monthChange}
            maxLength={2}
          />

          <TextInput 
            placeholder='dd'
            keyboardType='numeric'
            style={styles.input}
            value={day}
            onChangeText={dayChange}
            maxLength={2}
          />

          <TextInput 
            placeholder='yyyy'
            keyboardType='numeric'
            style={styles.input}
            value={year}
            onChangeText={yearChange}
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
            <Collapsible title={`Prime: ${isPrime()}`}>

              <Text>A prime number is a number that is only divisible by itself and 1. Example: 3 has no numbers (other than 1 and 3) that it can be divided by and result in a whole number.</Text>
            </Collapsible>
          </View>

          <View style={styles.patternTitle}>
            <Collapsible title={`Palindrome: ${isPalindrome()}`}>

            <Text>A palindrome is something that can be reversed and still read the same way. Example: &quot;racecar&quot; reversed is still &quot;racecar&quot;.</Text>
            </Collapsible>
          </View>

          <View style={styles.patternTitle}>
            <Collapsible title={`Perfect Power: ${isPerfectPower()}`}>

            <Text>A &quot;Perfect Power&quot; is a number that can be taken to the nth root where n is a number between 2 and 9. Examples: The square root (or 2nd root) of 9 is 3 because 3^2 = 9. The cubed root (or 3rd root) of 48 is 4 because 4^3 = 48.</Text>
            </Collapsible>
          </View>

          <View style={styles.patternTitle}>
            <Collapsible title={`Pythagorean: ${isPythagorean()}`}>

            <Text>An equation is &quot;Pythagorean&quot; when a^2 + b^2 = c^2. For example, 3^2 + 4^2 = 5^2 (9 + 16 = 25). In regards to a date, we check if day^2 + month^2 = year^2.</Text>
            </Collapsible>
          </View>

          <View style={styles.patternTitle}>
            <Collapsible title={`Armstrong Number: ${isArmstrongNumber()}`}>

            <Text>Armstrong Number: An &quot;Armstrong number&quot; is a number that is equal to the sum of its own digits each raised to the power of the number of digits. Example: 153 is an Armstrong number because it has 3 digits, and 1^3 + 5^3 + 3^3 = 1 + 125 + 27 = 153.</Text>
            </Collapsible>
          </View>

          <View style={styles.patternTitle}>
            <Collapsible title={`Math Equation: ${isMathEquation()}`}>

            <Text>This checks if the date entered is a math equation. Example: 10/13/0130 would be a math equation 10 * 13 = 0130</Text>
            </Collapsible>
          </View>
        </View>

          <Text style={styles.subTitle}>Colors:</Text>
          
        
        <View style={styles.colorContainer}>
          <Text style={styles.colorTitle}>
            American Hex Code: {americanHexCode} <Text style={{backgroundColor: americanHexCode}}>      </Text>
          </Text>
          
          
          <Text style={styles.colorTitle}>
            European Hex Code: {europeanHexCode} <Text style={{backgroundColor: europeanHexCode}}>      </Text>
          </Text>
          
        

          <Text style={styles.colorTitle}>
            American HSL Code: {americanHslCode} <Text style={{backgroundColor: americanHslCode}}>      </Text>
          </Text>

          <Text style={styles.colorTitle}>
            European HSL Code: {europeanHslCode} <Text style={{backgroundColor: europeanHslCode}}>      </Text>
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
    width: "90%",
    marginRight: 30
  },
  colorContainer: {
    alignItems: "flex-start",
    width: "95%",
    backgroundColor: "#fff"
  },
  patternTitle: {
    fontSize: 20,
    marginLeft: 10,
    marginBottom: 5
  },
  colorTitle: {
    fontSize: 20,
    marginBottom: 10,
    padding: 5,
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#000"
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
