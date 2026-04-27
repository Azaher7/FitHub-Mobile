import { PropsWithChildren } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAppTheme } from '@/providers/theme-provider';

type AppScreenProps = PropsWithChildren<{
  scroll?: boolean;
}>;

export function AppScreen({ children, scroll = true }: AppScreenProps) {
  const { tokens } = useAppTheme();
  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: tokens.colors.background,
    },
    backgroundLayer: {
      ...StyleSheet.absoluteFillObject,
      overflow: 'hidden',
    },
    ambientBlobTop: {
      position: 'absolute',
      width: 260,
      height: 260,
      borderRadius: 999,
      top: -130,
      left: -40,
      backgroundColor: 'rgba(76, 159, 255, 0.16)',
      shadowColor: '#5AAFFF',
      shadowOpacity: 0.24,
      shadowRadius: 50,
      shadowOffset: { width: 0, height: 0 },
    },
    ambientBlobRight: {
      position: 'absolute',
      width: 220,
      height: 220,
      borderRadius: 999,
      top: -90,
      right: -70,
      backgroundColor: 'rgba(133, 101, 255, 0.13)',
      shadowColor: '#8A72FF',
      shadowOpacity: 0.2,
      shadowRadius: 45,
      shadowOffset: { width: 0, height: 0 },
    },
    ambientBlobMid: {
      position: 'absolute',
      width: 180,
      height: 180,
      borderRadius: 999,
      top: '33%',
      right: -95,
      backgroundColor: 'rgba(51, 219, 255, 0.08)',
    },
    content: {
      flex: 1,
      paddingHorizontal: tokens.spacing.lg,
      paddingTop: 8,
      gap: 14,
    },
    scrollContent: {
      paddingBottom: 88,
    },
  });

  const content = <View style={styles.content}>{children}</View>;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View pointerEvents="none" style={styles.backgroundLayer}>
        <View style={styles.ambientBlobTop} />
        <View style={styles.ambientBlobRight} />
        <View style={styles.ambientBlobMid} />
      </View>
      {scroll ? (
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {content}
        </ScrollView>
      ) : (
        content
      )}
    </SafeAreaView>
  );
}
