import { Modal, View, Pressable, StyleSheet, Alert, Text } from 'react-native'
import { connect, useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { removeTodolistItem, toggleModalDelete } from '../../../actions/todo.actions'
import CustomButton from '../custom.button/custom.button'

const ModalComponent = () => {
    const dispatch = useDispatch()
    const modalVisible = useSelector( state => state.modalDelete)

    const closeModal = () => {
        dispatch(toggleModalDelete( { ...modalVisible, current : false, isDeleting: false }))
    }
    const confirmDelete = () => {
        modalVisible.callback()
        dispatch(toggleModalDelete( { ...modalVisible, current : false }))
    }

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible.current}
                onRequestClose={() => {
                    closeModal();
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Вы точно хотите удалить?</Text>
                        <View style={styles.wrapperBtns}>
                            <CustomButton
                                styles={[styles.button, styles.buttonDelete]}
                                onPress={confirmDelete}
                            >
                                <Text style={styles.textStyle}>Delete</Text>
                            </CustomButton>
                            <CustomButton
                                styles={styles.button}
                                onPress={closeModal}
                            >
                                <Text style={styles.textStyle}>Cancel</Text>
                            </CustomButton>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonDelete : {
        backgroundColor: '#a10531'
    },
    wrapperBtns: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        width: '100%',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        width: 300,
        height: 200,
        justifyContent: 'center',
        backgroundColor: "white",
        borderRadius: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        padding: 10,
        elevation: 2,
        width: 80,
        marginLeft: 10,
        marginRight: 10,
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 35,
        textAlign: "center"
    }
});

const mapStateToProps = (state) => {
    const { modalDelete } = state
    return { modalDelete }
};
const mapDispatchToProps = dispatch => (
    bindActionCreators({
        toggleModalDelete,
    }, dispatch)
);
// export default connect(mapStateToProps, mapDispatchToProps)(ModalComponent)
export default ModalComponent
