import classes from "./styles/Landing.module.css"
import { Auth } from "../components"
import { Box, Button, Card, CardBody, CardHeader, Container, Heading, HStack, Image, List, ListItem, Stack, Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs, Text, UnorderedList, VStack } from '@chakra-ui/react'
import condosIMG from "../assets/images/landing/condos.png"

import coverIMG from "../assets/images/landing/cover.jpeg"
import constructionIMG from "../assets/images/landing/construction.png"
import landingKeyIMG from "../assets/images/landing/landing-key.png"
import laptopIMG from "../assets/images/landing/laptop.png"
import magnifyingIMG from "../assets/images/landing/magnifying.png"
import messagesIMG from "../assets/images/landing/messages.png"
import mobileFinances from "../assets/images/landing/mobile-finances.png"

import businessInsiderLogo from "../assets/images/landing/logos/business_insider.png"
import forbesLogo from "../assets/images/landing/logos/forbes.svg"
import realtorComLogo from "../assets/images/landing/logos/realtor_com.png"
import realtyTimesLogo from "../assets/images/landing/logos/realty_times.png"
import wsjLogo from "../assets/images/landing/logos/wsj.svg"
import LandingTabPanel from '../ui/LandingTabPanel.jsx'
import Footer from '../components/navigation/Footer.jsx'
import LandingSection from '../ui/LandingSection.jsx'

// home page for public (no user logged in)
const Landing = () => {
	return (
		<VStack className={classes.container}>

			<LandingSection>
				<Stack flexDirection={{ base: "column", xl: "row" }}>
					<VStack justifyContent="center" alignItems="center">
						<Heading>RENTAL PROPERTY MANAGEMENT SOFTWARE</Heading>
						<Heading>Make self-managing rentals simple</Heading>
						<Button>Sign Up for Free</Button>
						<Text>Get leads, screen tenants, create leases, and collect rent — all in one place. Free for landlords.</Text>
						<Text>Work smarter, not harder. Everything you need in one app..</Text>
					</VStack>
					<Box maxHeight="100%">
						<Image src={coverIMG} alt="image"/>
					</Box>
				</Stack>
			</LandingSection>

			<LandingSection backgroundColor="lightBlue">
				<Stack flexDirection={{ base: "column", xl: "row" }}>
					<Box maxHeight="100%">
						<Image src={landingKeyIMG}></Image>
					</Box>
				<VStack>
					<Heading>The All-in-One solution for managing finances and tenants</Heading>
					<Text>LeaseLink’s intuitive toolset helps half a million landlords and investors streamline their entire rental process for free – whether they have one or 1,000 doors.</Text>
				</VStack>
				</Stack>
			</LandingSection>

			<LandingSection >
				<VStack justifyContent="space-around" paddingY={32}>
					<Text textAlign="center" fontSize="6xl" fontWeight={700}>As Seen In:</Text>
					<HStack justifyContent="space-around">
						<Image src={businessInsiderLogo} width="16%"></Image>
						<Image src={forbesLogo} width="16%"></Image>
						<Image src={realtorComLogo} width="16%"></Image>
						<Image src={realtyTimesLogo} width="16%"></Image>
						<Image src={wsjLogo} width="16%"></Image>
					</HStack>
				</VStack>
			</LandingSection>


			<LandingSection backgroundColor="lightBlue">
				<VStack justifyContent="space-evenly">
					<Box>
						<Heading>Two simple plans to fit your needs</Heading>
						<Text>LeaseLink makes it easy to manage your rentals yourself.</Text>
						<Text>No hassles. No headaches. Just passive income.</Text>
					</Box>

					<HStack gap={16}>
						<Card>
							<CardHeader>
								<Heading>
									FREE
								</Heading>
								<Heading>
									<span>$0</span><span>/mo</span>
								</Heading>
							</CardHeader>
							<CardBody display="flex" flexDirection="column" gap={12}>
								<UnorderedList>
									<ListItem>10 Properties</ListItem>
									<ListItem>Tenant Messaging</ListItem>
									<ListItem>View Rent Balances</ListItem>
									<ListItem>Create Rent Receipts</ListItem>
									<ListItem>Manage Finances</ListItem>
								</UnorderedList>
								<Button>Create My Free Account</Button>
							</CardBody>
						</Card>

						<Card>
							<CardHeader>
								<Heading>
									PREMIUM
								</Heading>
								<Heading>
									<span>$9</span><span>/mo</span>
								</Heading>
							</CardHeader>
							<CardBody display="flex" flexDirection="column" gap={12}>
								<UnorderedList>
									<ListItem>Unlimited Properties</ListItem>
									<ListItem>Unlimited Tenants</ListItem>
									<ListItem>Pay Rent Directly from App</ListItem>
									<ListItem>Detailed Appliance List</ListItem>
									<ListItem>Extended Maintenance Records</ListItem>
								</UnorderedList>
								<Button>Sign Up to Get Premium</Button>
							</CardBody>

						</Card>
					</HStack>
				</VStack>
			</LandingSection>

			<LandingSection>
				<Tabs height="xl">
					<TabList justifyContent="space-evenly">
						<Tab>Expenses</Tab>
						<Tab>Maintenance</Tab>
						<Tab>Messaging</Tab>
						<Tab>Forms</Tab>
					</TabList>
					<TabIndicator />
					<TabPanels>
						<LandingTabPanel
							heading="Keep your finances organized in one place"
							text="Track and store your expenses with ease. Filter by unit, send rent receipts, export into excel."
							image={mobileFinances}
						/>
						<LandingTabPanel
							heading="Built-in, professional maintenance requests"
							text="Tenants can easily submit any issues from their portal, and you can keep a paper trail of all maintenance performed."
							image={constructionIMG}
						/>
						<LandingTabPanel
							heading="Your professional messaging app"
							text="Keep your phone number private from leads and applicants, and keep tenant communication in one place."
							image={messagesIMG}
						/>
						<LandingTabPanel
							heading="All the forms you need to succeed"
							text="Access 32 essential rental forms, from welcome letters to rent increase notices. Available for download in PDF format. Let us take care of preparing your leases and application forms so you have time to focus on the important stuff."
							image={laptopIMG}
						/>
					</TabPanels>
				</Tabs>
			</LandingSection>






			<Footer/>
		</VStack>
	);
};
/*

Rental Management software

Why pay a manager 10%?
Manage all your properties here. All in one place.





 */

export default Landing;