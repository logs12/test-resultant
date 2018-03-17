import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';

import { 
  Table, 
  TableWrapper, 
  Row, 
  Rows, 
  Col, 
  Cols, 
  Cell, 
} from 'react-native-table-component';

import NavigationBar from 'react-native-navbar';

export default class App extends Component {

  state = {
    tableData: []
  }

  tableHead = [
    'Название валюты',
    'Цена',
    'Количество',
  ]

  loadData() {
    return fetch('http://phisix-api3.appspot.com/stocks.json')
    .then(
      (response) => {
        return response.json()
      }
    )
    .then((responseJson) => {
      let tableData = [];
      responseJson.stock.forEach((element, item) => {
        tableData[item] = [
          element.name, 
          Number(element.volume).toFixed(0),
          Number(element.price.amount).toFixed(2)
        ]
      });
      this.setState({tableData: tableData });
    })
    .catch((error) => {
      console.error(error);
    });
  }

  componentWillMount() {
    setInterval(() => this.loadData(), 15000);
  }

  titleConfig = {
    title: 'Таблица валют',
  };

  rightButtonConfig = {
    title: 'Обновить',
    handler: () => this.loadData(),
  };

  render() {
    return (
      <View>
        <NavigationBar
          title={this.titleConfig}
          rightButton={this.rightButtonConfig}
        />
        <Table>
        <ScrollView vertical={true}>
            <TableWrapper>
              <Row data={this.tableHead} style={styles.head} textStyle={styles.text}/>
              <Rows data={this.state.tableData} style={styles.row} textStyle={styles.text}/>
            </TableWrapper>
          </ScrollView>
        </Table>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  head: { height: 50, backgroundColor: '#f1f8ff' },
  text: { marginLeft: 5 },
  row: { height: 50 }
});
