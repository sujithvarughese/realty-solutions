import classes from "./styles/Landing.module.css"
import { Auth } from "../components"
import { Box, Button, Card, CardBody, CardHeader, Container, Heading, HStack, Image, List, ListItem, Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs, Text, UnorderedList, VStack } from '@chakra-ui/react'
import condosIMG from "../assets/images/landing/condos.png"

import constructionIMG from "../assets/images/landing/construction.png"
import landingKeyIMG from "../assets/images/landing/landing-key.png"
import laptopIMG from "../assets/images/landing/laptop.png"
import magnifyingIMG from "../assets/images/landing/magnifying.png"

import businessInsiderLogo from "../assets/images/landing/logos/business_insider.png"
import forbesLogo from "../assets/images/landing/logos/forbes.svg"
import realtorComLogo from "../assets/images/landing/logos/realtor_com.png"
import realtyTimesLogo from "../assets/images/landing/logos/realty_times.png"
import wsjLogo from "../assets/images/landing/logos/wsj.svg"
import LandingTabPanel from '../ui/LandingTabPanel.jsx'

// home page for public (no user logged in)
const Landing = () => {
	return (
		<VStack className={classes.container}>


			<HStack height="lg">
				<Container>
					<Text fontSize="3xl">Realty Solutions</Text>
					<Text fontSize="3xl">Real solutions for all your property needs.</Text>
				</Container>
				<Container>
					<Image src={condosIMG} alt="condos" />
				</Container>
			</HStack>

			<VStack height="lg" justifyContent="space-evenly" paddingY={32}>
				<Text fontSize="6xl" fontWeight={700}>As Seen In:</Text>
				<HStack justifyContent="space-around">
					<Image src={businessInsiderLogo} width="16%"></Image>
					<Image src={forbesLogo} width="16%"></Image>
					<Image src={realtorComLogo} width="16%"></Image>
					<Image src={realtyTimesLogo} width="16%"></Image>
					<Image src={wsjLogo} width="16%"></Image>
				</HStack>
			</VStack>

			<HStack height="lg">
				<VStack>
					<Heading>The All-in-One solution for managing finances and tenants</Heading>
					<Text>LeaseLink’s intuitive toolset helps half a million landlords and investors streamline their entire rental process for free – whether they have one or 1,000 doors.</Text>
				</VStack>
				<Image src={landingKeyIMG} width="50%"></Image>
			</HStack>

			<VStack height="lg" justifyContent="space-evenly">
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

			<HStack height="lg">
				<Text>Let us take care of preparing your leases and application forms so you have time to focus on the important stuff.</Text>
				<Image src={laptopIMG} alt="laptop" width="50%" />
			</HStack>

			<VStack height="lg">
				<Box>
					<Heading>Rental Management</Heading>
					<Heading>All the tools you need to keep your process in one place</Heading>
					<Text>Work smarter, not harder. Everything you need is all in one place.</Text>
				</Box>
			</VStack>


				<Tabs height="lg">
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
							image={magnifyingIMG}
						/>
						<LandingTabPanel
							heading="Built-in, professional maintenance requests"
							text="Tenants can easily submit any issues from their portal, and you can keep a paper trail of all maintenance performed."
							image={magnifyingIMG}
						/>
						<LandingTabPanel
							heading="Your professional messaging app"
							text="Keep your phone number private from leads and applicants, and keep tenant communication in one place."
							image={magnifyingIMG}
						/>
						<LandingTabPanel
							heading="All the forms you need to succeed"
							text="Access 32 essential rental forms, from welcome letters to rent increase notices. Available for download in PDF format."
							image={magnifyingIMG}
						/>
					</TabPanels>
				</Tabs>


		</VStack>
	);
};
/*

Rental Management software

Why pay a manager 10%?
Manage all your properties here. All in one place.





 */

export default Landing;