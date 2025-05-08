import { SafeAreaView } from 'react-native-safe-area-context';
import SearchHeader from '@/components/home/Header';

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <SearchHeader />
      {/* le reste de ta page */}
    </SafeAreaView>
  );
}
