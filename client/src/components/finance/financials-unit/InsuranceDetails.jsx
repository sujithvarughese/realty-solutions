import classes from "../../../pages/accounting/styles/UnitFinancials.module.css";

const InsuranceDetails = ({ insurance }) => {
    return (
        <div className={classes.table}>
            <div className={classes.head}>
                Insurance
            </div>
            <div className={classes.body}>
                <div className={classes.tr}>
                    <div className={classes.td}>Company</div>
                    <div className={classes.td}>{insurance.company}</div>
                </div>
                <div className={classes.tr}>
                    <div className={classes.td}>Agent</div>
                    <div className={classes.td}>{insurance.agent}</div>
                </div>
                <div className={classes.tr}>
                    <div className={classes.td}>Phone</div>
                    <div className={classes.td}>{insurance.phone}</div>
                </div>
                <div className={classes.tr}>
                    <div className={classes.td}>Email</div>
                    <div className={classes.td}>{insurance.email}</div>
                </div>
                <div className={classes.tr}>
                    <div className={classes.td}>Payment</div>
                    <div className={classes.td}>{insurance.payment}</div>
                </div>
                <div className={classes.tr}>
                    <div className={classes.td}>Coverage</div>
                    <div className={classes.td}>{insurance.coverage}</div>
                </div>
            </div>
        </div>
    );
};

export default InsuranceDetails;