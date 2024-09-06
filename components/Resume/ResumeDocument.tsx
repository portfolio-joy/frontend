import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { UserResponseType } from '@/types/UserResponseType';

Font.register({
  family: 'Tinos',
  src: 'http://fonts.gstatic.com/s/tinos/v9/EqpUbkVmutfwZ0PjpoGwCg.ttf'
});

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Tinos'
  },
  header: {
    padding:'0 30',
    fontSize: 20,
    borderBottom: '1px solid grey',
    marginBottom: 10
  },
  section: {
    marginBottom: 10,
    padding: 5,
  },
  username: {
    fontSize: 24,
    padding: 10,
    fontWeight: 700,
    textAlign: 'center',
    backgroundColor: '#345',
    color: 'white'
  },
  contact: {
    flexDirection: 'row',
    borderBottom: '1px',
    padding: 10,
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: 20,
    backgroundColor: '#345',
    color: 'white'
  },
  contactInfo: {
    fontSize: 12,
    paddingRight: 10,
  },
  subheader: {
    padding: '0 30',
    fontSize: 16,
    marginBottom: 5,
  },
  text: {
    padding: '0 30',
    fontSize: 12,
    marginBottom: 10,
  },
  listItem: {
    display: 'flex',
    padding: '10 20',
    fontSize: 12,
    marginLeft: 5,
    marginBottom: 2,
  },
  contactDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  icon: {
    fontSize: 12,
    marginRight: 5,
  },
});

export default function ResumeDocument(user: UserResponseType) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.username}>{user?.aboutMe?.name}</Text>
        <View style={styles.contact}>
          <Text style={styles.contactInfo}>{user?.contact?.phoneNo}</Text>
          <Text style={styles.contactInfo}>{user?.contact?.emailId} </Text>
          <Text style={styles.contactInfo}>{user?.contact?.address}</Text>
        </View>
        <Text style={styles.text}>
          {user?.aboutMe?.description}
        </Text>
        <View>
          <Text style={styles.header}>Projects</Text>
          {
            user?.projects?.slice(0, 3)?.map((project, index) =>
              <View key={index} style={styles.section}>
                <Text style={styles.subheader}>{project?.name}</Text>
                <Text style={styles.text}>
                  {project?.briefDetail}
                </Text>
              </View>
            )
          }
        </View>
        <View>
          <Text style={styles.header}>Testimonials</Text>
          {
            user?.testimonials?.slice(0, 3)?.map((testimonial, index) =>
              <View key={index} style={styles.section}>
                <Text style={styles.subheader}>{`${testimonial?.name}(${testimonial?.designation})`}</Text>
                <Text style={styles.text}>
                  {testimonial?.description}
                </Text>
              </View>
            )
          }
        </View>
        <View style={styles.section}>
          <Text style={styles.header}>Skills</Text>
          <View style={{display:'flex', flexDirection:'row', flexWrap: 'wrap'}}>
            {
              user?.skills?.map((skills, index) =>
                <Text key={index} style={styles.listItem}>&#8224;  {skills.name}</Text>
              )
            }
          </View>
        </View>
      </Page>
    </Document>
  )
}