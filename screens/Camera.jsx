import { Pressable, View } from 'react-native';
import { Camera,CameraType} from 'react-native-camera-kit';
import { storage } from '../appwrite/appwriteConfig';
import RNFS from 'react-native-fs';
import { useState,useEffect } from 'react';
export function CameraScreen(){
    const [directories, setDirectories] = useState([]);
    useEffect(() => {
        const directoryPath = RNFS.PicturesDirectoryPath;
    
        RNFS.readdir(directoryPath)
          .then(files => {
            setDirectories(files);
          })
          .catch(error => {
            console.log('Error reading directory:', error);
          });
      }, [directories]);
    return (    
    <View
    style={{
        backgroundColor:'black'
    }}
    >
<Camera 
    style={{
        height:"79%",
    }}
    ref={(ref) => (this.camera = ref)}
    cameraType={CameraType.Front} // front/back(default)
    flashMode='auto'
    zoomMode='off'
    focusMode='off'
    />
<Pressable
    onPress={
        async()=>{
        var {uri} = await this.camera.capture();
        console.log(uri);
        if (uri.startsWith('file://')) {
  // Platform dependent, iOS & Android uses '/'
  const pathSplitter = '/';
  // file:///foo/bar.jpg => /foo/bar.jpg
  const filePath = uri.replace('file://', '');
  // /foo/bar.jpg => [foo, bar.jpg]
  const pathSegments = filePath.split(pathSplitter);
  // [foo, bar.jpg] => bar.jpg
  const fileName = pathSegments[pathSegments.length - 1];

  await RNFS.moveFile(filePath, `${RNFS.PicturesDirectoryPath}/${fileName}`).then(
    (res)=>{
        RNFS.readdir(RNFS.PicturesDirectoryPath)
      .then(files => {
        setDirectories(files);
      })
      .catch(error => {
        console.log('Error reading directory:', error);
      });
    }
  );
        console.log(directories);
        const promise = storage.createFile(
            "66110d36abd4de635c32",
            Math.random(1000),
            directories[0]
        );
        promise.then(function (response) {
            console.log(response); // Success
        }, function (error) {
            console.log(error); // Failure
        });
}

    }}
>
<View
    style={{
        height:'30%'
    }}
    >
        <View
        style={{
            alignSelf:'center',
            borderColor:'white',
            borderRadius:50,
            borderWidth:1,
            width:60,
            height:60,
            margin:10
        }}
        >
        </View>
    </View>
</Pressable>
    </View>)
}