import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { koulenFont } from '../styles/fonts';

interface TabBarProps {
  current: string;
  onTabPress: (tab: string) => void;
}

export default function TabBar({ current, onTabPress }: TabBarProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => onTabPress('Gallery')} style={styles.tab}>
        <Text style={[styles.tabText, koulenFont, current === 'Gallery' && styles.active]}>Gallery</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onTabPress('Home')} style={styles.tab}>
        <Text style={[styles.tabText, koulenFont, current === 'Home' && styles.active]}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onTabPress('Edit')} style={styles.tab}>
        <Text style={[styles.tabText, koulenFont, current === 'Edit' && styles.active]}>Edit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#222',
    paddingVertical: 10,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 18,
    color: '#fff',
  },
  active: {
    color: '#C3E722',
  },
}); 