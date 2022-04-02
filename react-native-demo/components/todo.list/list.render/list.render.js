import {
  ScrollView,
  StyleSheet,
  Text
} from 'react-native'
import ListItem from '../list.item/list.item'
import { useEffect, useLayoutEffect, useState } from 'react'
import { storeData } from '../../../store/app.store'
import { TODO_STORE } from '../../../constants/store.constants'

const ListRender = ({ todoList, setTodoList }) => {
  const searchHandler = (value) => {
    const filtered = todoList.filter(el => el.value.includes(value))
    setTodoList(filtered)
  }
  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerSearchBarOptions: {
  //       placeholder: 'Найти заметку по имени',
  //       textColor: '#fff',
  //       hintTextColor: '#fff',
  //       headerIconColor: '#fff',
  //       onChangeText: (event) => searchHandler(event.nativeEvent.text),
  //     }
  //   });
  // }, [navigation]);

  useEffect(() => {
    storeData(TODO_STORE, todoList)
  }, [todoList])

  const renderList = () => {
    return todoList.map((el) => (
      <ListItem
        key={el.id}
        item={el}
        setTodoList={setTodoList}
        todoList={todoList}
      />
    ))
  }
  const renderItem = ({ item }) => (
    <ListItem item={item} setTodoList={setTodoList} />
  )

  return (
      <ScrollView
          style={styles.list}
          disableScrollViewPanResponder={true}
          snapToInterval={100}
          decelerationRate="normal"
          contentInsetAdjustmentBehavior="automatic"
      >
        {todoList.length ? renderList() : (
            <Text>Пока что нету заметок...</Text>
        )}
      </ScrollView>
  )
}
const styles = StyleSheet.create({
  list: {
    // width: '100%',
    // flexDirection: 'column',
    // height: 500,
    // flex: 1,
    // marginBottom: 30,
  },
})


export default ListRender
