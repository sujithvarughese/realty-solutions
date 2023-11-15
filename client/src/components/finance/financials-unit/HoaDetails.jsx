import classes from "../../../pages/accounting/styles/UnitFinancials.module.css";
const HoaDetails = ({ hoa }) => {
    return (
        <div className={classes.table}>
            <div className={classes.head}>
                Home Owner's Association
            </div>
            <div className={classes.body}>
                <div className={classes.tr}>
                    <div className={classes.td}>Company</div>
                    <div className={classes.td}>{hoa.company}</div>
                </div>
                <div className={classes.tr}>
                    <div className={classes.td}>Agent</div>
                    <div className={classes.td}>{hoa.agent}</div>
                </div>
                <div className={classes.tr}>
                    <div className={classes.td}>Phone</div>
                    <div className={classes.td}>{hoa.phone}</div>
                </div>
                <div className={classes.tr}>
                    <div className={classes.td}>Email</div>
                    <div className={classes.td}>{hoa.email}</div>
                </div>
                <div className={classes.tr}>
                    <div className={classes.td}>Payment</div>
                    <div className={classes.td}>{hoa.payment}</div>
                </div>
            </div>
        </div>
    );
};

export default HoaDetails;