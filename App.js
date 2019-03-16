import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Image  } from 'react-native';
import { Camera, Permissions } from 'expo';
// import { Camera } from 'expo-camera';

export default class App extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
  };
  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }
 async snapPhoto() {       
    console.log('Button Pressed');
    if (this.camera) {
       console.log('Taking photo');
       const options = { quality: 1, base64: true, fixOrientation: true, 
       exif: true};
       await this.camera.takePictureAsync(options).then(photo => {
          photo.exif.Orientation = 1;            
           console.log(photo);            
           });     
     }
    }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
        <Camera style={{ flex: 1 }} type={this.state.type} ref={ (ref) => {this.camera = ref}}>
        <View
        style={{
          flex: 1,
          backgroundColor: 'transparent',
          flexDirection: 'row',
        }}>
        <TouchableOpacity
        style={{
          flex: 0.1,
          alignSelf: 'flex-end',
          alignItems: 'center',
        }}
        onPress={() => {
          this.setState({
            type: this.state.type === Camera.Constants.Type.back
            ? Camera.Constants.Type.front
            : Camera.Constants.Type.back,
          });
        }}>
        <Text
        style={{ fontSize: 15, marginBottom: 10, color: 'white' }}>
        {' '}Flip{' '}
        </Text>

        </TouchableOpacity>

        <TouchableOpacity style={{ marginTop: 500,marginLeft:100}}onPress={this.snapPhoto.bind(this)}>
        <Image style={{width: 100, height: 100}}   source={require('./assets/circle.png')}       
        />
        </TouchableOpacity>
        
        </View>
        
        </Camera>







        </View>
        );
    }
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
