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
      width: 230,
      height: 230,
      borderRadius: 999,
      top: -110,
      left: -36,
      backgroundColor: 'rgba(76, 159, 255, 0.14)',
      shadowColor: '#5AAFFF',
      shadowOpacity: 0.18,
      shadowRadius: 34,
      shadowOffset: { width: 0, height: 0 },
    },
    ambientBlobRight: {
      position: 'absolute',
      width: 200,
      height: 200,
      borderRadius: 999,
      top: -82,
      right: -65,
      backgroundColor: 'rgba(51, 219, 255, 0.09)',
      shadowColor: '#53CCFF',
      shadowOpacity: 0.14,
      shadowRadius: 28,
      shadowOffset: { width: 0, height: 0 },
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
