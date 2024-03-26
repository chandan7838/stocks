import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const TotalStockValue = (props) => {
    const {userHoldings} = props;
    const [hideData, setHideData] = useState(true);

    const currentValue = () =>  {
        let currentValue = 0;
        for(let i=0; i < userHoldings?.length; i++){
            currentValue += userHoldings[i]?.ltp * userHoldings[i]?.quantity;
        }
        return currentValue;
    }

    const totalInvestment = () => {
        let totalInvestment = 0;
        for(let i=0; i < userHoldings?.length; i++){
            totalInvestment += userHoldings[i]?.avgPrice * userHoldings[i]?.quantity;
        }
        return totalInvestment;
    }

    const totalPNL = () => {
        return currentValue() - totalInvestment();
    }

    const todayPNL = () => {
        let todayPNL = 0;
        for(let i=0; i < userHoldings?.length; i++){
            todayPNL += (userHoldings[i]?.close - userHoldings[i]?.ltp) * userHoldings[i]?.quantity;
        }
        return todayPNL;
    }

    const handlePress = (value) => {
        setHideData(value)
    }

    const ArrowImage = (props) => {
        const {isRotate=false} = props || {};
        return (
            <TouchableOpacity onPress={() => handlePress(isRotate ? true : false)}>
                <Image style={isRotate ? styles.downArrow : styles.downArrowRotate} resizeMode='contain' source={require("../images/down-arrow-icon.png")}/>
            </TouchableOpacity>
        )
    }

  return (
    <View style={styles.container}>
        {!hideData && <>
            <ArrowImage isRotate={true}/>
            <View style={styles.stockDataContainer}>
                <Text style={styles.heading}>{"Current Value"}</Text>
                <Text>{`₹${currentValue()}`}</Text>
            </View>
            <View style={{...styles.stockDataContainer, ...styles.marginTop}}>
                <Text style={styles.heading}>{"Total Investment"}</Text>
                <Text>{`₹${totalInvestment()}`}</Text>
            </View>
            <View style={{...styles.stockDataContainer, ...styles.marginTop}}>
                <Text style={styles.heading}>{"Today's Profit and Loss"}</Text>
                <Text>{`₹${Number(todayPNL()).toFixed(2)}`}</Text>
            </View>
        </>}
        {hideData && <ArrowImage/>}
        <View style={{...styles.stockDataContainer, ...styles.marginTop}}>
            <Text style={styles.heading}>{"Total Profit and Loss"}</Text>
            <Text>{`₹${Number(totalPNL()).toFixed(2)}`}</Text>
        </View>
    </View>
  );
}

export default TotalStockValue;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: "column",
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  stockDataContainer: {
    width: "100%",
    flexDirection: "row",
    height: 20,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  marginTop: {
    marginTop: 8
  },
  heading: {
    fontWeight: "800",
    fontSize: 16
  },
  downArrow: {
    width:24,
    height:24
  },
  downArrowRotate: {
    transform: [{ rotate: '180deg'}],
    width:24,
    height:24
  }
});
