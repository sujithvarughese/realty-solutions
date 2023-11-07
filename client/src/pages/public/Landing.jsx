import classes from "./styles/Landing.module.css"
import img1 from '../../assets/images/landing/landing-key.png'
import img2 from '../../assets/images/landing/magnifying.png'
import img3 from '../../assets/images/landing/laptop.png'
import img4 from '../../assets/images/landing/condos.png'
import img5 from '../../assets/images/landing/construction.png'

// home page for public (no user logged in)
const Landing = () => {
	return (
		<div className={classes.landing}>

			<div className={classes.element}>
				<div className={classes.text}>
					The only one-stop solution to seamlessly manage all your properties in one place
				</div>
				<div className={classes.image}>
					<img src={img1} alt="img1"/>
				</div>
			</div>

			<div className={classes.element}>
				<div className={classes.image}>
					<img src={img2} alt="img2"/>
				</div>
				<div className={classes.text}>
					Easily manage maintenance requests, interact with tenants, collect rent and automatically generate rent receipts
				</div>
			</div>

			<div className={classes.element}>
				<div className={classes.text}>
					Whether you're a real estate expert or buying you're first property, we have a plan for you.
				</div>
				<div className={classes.image}>
					<img src={img3} alt="img3"/>
				</div>

			</div>

			<div className={classes.element}>
				<div className={classes.image}>
					<img src={img4} alt="img4"/>
				</div>
				<div className={classes.text}>
					We know managing your real estate investments can be challenging. And property management companies take a big chunk out of your income. Let us do the tough part for you!
				</div>
			</div>

			<div className={classes.element}>
				<div className={classes.text}>
					Homeowners insurance? Taxes? Associate fees? We take care of organizing your payments so you can take care of your priorities!
				</div>
				<div className={classes.image}>
					<img src={img5} alt="img5"/>
				</div>
			</div>
		</div>
	);
};

export default Landing;