import { StyleSheet } from 'react-native';

export const gloabalStyles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  subTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
  },
  header: {
    flex: 1,
    width: '100%',
    backgroundColor: 'rgba(30,30,30,1)',
    justifyContent: 'center',
    paddingLeft: 30,
  },
  body: {
    flex: 4,
    width: '100%',
    backgroundColor: 'rgba(30,30,30,1)',
    paddingHorizontal: 30,
    paddingBottom: 20,
  },
  footer: {
    flex: 0.5,
    width: '100%',
    backgroundColor: 'rgba(60,60,60,1)',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  hr: {
    borderBottomColor: 'white',
    borderBottomWidth: 3,
    marginVertical: 10,
  },
  text: {
    color: 'white',
    fontSize: 18,
  },
});
