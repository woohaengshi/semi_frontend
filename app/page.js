import Timer from '@/components/Timer';
import { Flex, Text, Button } from '@radix-ui/themes';

// function MyApp() {
//   return (
//     <Flex direction="column" gap="2">
//       <Text>Hello from Radix Themes :)</Text>
//       <Button>Let's go</Button>
//     </Flex>
//   );
// }

export default function Home() {
  return (
    <main >
      {/* <MyApp /> */}
      <Timer size={400} maxTime={60} />
    </main>
  );
}
