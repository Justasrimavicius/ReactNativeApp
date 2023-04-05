import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface props{
  showBrowse: React.Dispatch<React.SetStateAction<Boolean>>
}

export default function StartView(props: props) {

  return (
    <View style={styles.container}>
      <Text style={styles.headText}>Flexn project</Text>
      <TouchableOpacity onPress={()=>{props.showBrowse(true)}}
        style={styles.button}>
        <Text style={styles.buttonText}>Browse</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headText: {
    fontSize: 50,
    marginBottom: 30
  },
  button: {
    backgroundColor: 'rgb(165, 215, 232)',
    width: 200,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold'
  }
});
