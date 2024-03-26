import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const StockListCard = (props) => {
    const {symbol="", quantity="", ltp="", avgPrice=""} = props
  return (
    <View style={styles.container}>
        <View style={styles.stockDataContainer}>
            <Text style={styles.symbol}>{symbol}</Text>
            <Text>{`LTP: ₹${ltp}`}</Text>
        </View>
        <View style={{...styles.stockDataContainer, ...styles.marginTop}}>
            <Text>{quantity}</Text>
            <Text>{`P/L: ₹${Number(ltp * quantity - avgPrice * quantity).toFixed(2)}`}</Text>
        </View>
    </View>
  );
}

export default StockListCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    flexDirection: "column",
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stockDataContainer: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  marginTop: {
    marginTop: 8
  },
  symbol: {
    fontWeight: "800",
    fontSize: 16
  }
});
