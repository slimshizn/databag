import { ActivityIndicator, Platform, Image, View, Text, TouchableOpacity } from 'react-native';
import { useEffect, useRef } from 'react';
import Colors from 'constants/Colors';
import Video from 'react-native-video';
import { useAudioAsset } from './useAudioAsset.hook';
import { styles } from './AudioAsset.styled';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import audio from 'images/audio.png';
import { useKeepAwake } from '@sayem314/react-native-keep-awake';
import MatIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export function AudioAsset({ asset, dismiss }) {

  const { state, actions } = useAudioAsset(asset);

  const player = useRef(null);

  useKeepAwake();

  return (
    <View style={styles.container}>
      <Image source={audio} style={{ width: state.width, height: state.height }} resizeMode={'contain'} />
      <Text style={styles.label}>{ asset.label }</Text>
      { !state.playing && state.loaded && (
        <TouchableOpacity style={styles.control} onPress={actions.play}>
          <Icons name="play-circle-outline" size={92} color={Colors.text} />
        </TouchableOpacity>
      )}
      { state.showDownloaded && (
        <View style={styles.downloaded}>
          <MatIcons name="folder-download-outline" size={22} color={Colors.white} />
          { Platform.OS === 'ios' && (
            <Text style={styles.downloadedLabel}>Documents</Text>
          )}
          { Platform.OS !== 'ios' && (
            <Text style={styles.downloadedLabel}>Download</Text>
          )}
        </View>
      )}
      { state.playing && state.loaded && (
        <TouchableOpacity style={styles.control} onPress={actions.pause}>
          <Icons name="pause-circle-outline" size={92} color={Colors.text} />
        </TouchableOpacity>
      )}
      { state.url && Platform.OS === 'ios' && (
        <TouchableOpacity style={styles.share} onPress={actions.share}>
          <MatIcons name="share-variant-outline" size={32} color={Colors.white} />
        </TouchableOpacity>
      )}
      { state.url && Platform.OS !== 'ios' && (
        <TouchableOpacity style={styles.share} onPress={actions.download}>
          { state.downloaded && (
            <MatIcons name="download-outline" size={32} color={Colors.white} />
          )}
          { !state.downloaded && (
            <MatIcons name="download" size={32} color={Colors.white} />
          )}
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.close} onPress={dismiss}>
        <Icons name="window-close" size={32} color={Colors.text} />
      </TouchableOpacity>

      { state.url && (
        <Video ref={player} source={{ uri: state.url }} repeat={true}
          paused={!state.playing} onLoad={actions.loaded} style={styles.player} />
      )}
      { !state.loaded && (
        <TouchableOpacity style={styles.loading} onPress={dismiss}>
          <ActivityIndicator color={Colors.black} size="large" />
          { asset.total > 1 && (
            <Text style={styles.decrypting}>{ asset.block } / { asset.total }</Text>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
}
  
