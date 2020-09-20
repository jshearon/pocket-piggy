import React from 'react';
import { CSSTransition } from 'react-transition-group';
import ledger from '../../helpers/data/ledger';
import users from '../../helpers/data/users';

import AddLedgerForm from '../AddLedgerForm/AddLedgerForm';
import utils from '../../helpers/utils';

import './child.scss';
import DisplayLedger from '../DisplayLedger/DisplayLedger';

class Child extends React.Component {
  state = {
    childData: {},
    balance: {},
    childLedger: [],
    isLoaded: false,
    addLedgerForm: false,
    ledgerData: {},
  }

  getChildData() {
    const { childId } = this.props.match.params;
    this.setState({ isLoaded: false });
    users.getUser(childId)
      .then((childData) => {
        ledger.getLedgerByChildId(childId)
          .then((ledgerData) => {
            const balance = utils.getBalance(ledgerData);
            this.setState({
              childLedger: ledgerData,
              childData: childData.data,
              isLoaded: true,
              balance,
            });
          });
      })
      .catch((err) => {
        console.error(err);
        this.setState({ isLoading: false });
      });
  }

  updateLedger = (childId) => {
    ledger.getLedgerByChildId(childId)
      .then((ledgerData) => {
        const balance = utils.getBalance(ledgerData);
        this.setState({ childLedger: ledgerData, isLoaded: true, balance });
      })
      .catch((err) => {
        this.setState({ isLoading: false });
      });
  }

  editLedgerItem = (ledgerData) => {
    this.setState({ ledgerData });
    this.toggleAddLedgerForm();
  }

  clearLedger = () => {
    this.setState({ ledger: {} });
  }

  toggleAddLedgerForm = (e) => {
    if (e && e.target.id === 'newItem') {
      this.setState({ ledgerData: {} });
    }
    this.setState((prevState) => ({
      addLedgerForm: !prevState.addLedgerForm,
    }));
  }

  componentDidMount() {
    this.getChildData();
  }

  render() {
    const {
      childData,
      isLoaded,
      addLedgerForm,
      balance,
      childLedger,
      ledgerData,
    } = this.state;
    const { childId } = this.props.match.params;
    const printLedger = childLedger.map((ledgerItem) => <DisplayLedger key={ledgerItem.id} ledgerItem={ledgerItem} editLedgerItem={this.editLedgerItem} />);
    if (!isLoaded) {
      return <div className="loader fa-3x"><i className="fas fa-cog fa-spin"></i></div>;
    }
    return (
      <div className="Child content d-flex flex-column justify-content-start">
        <CSSTransition key={'addFamilyForm'} in={addLedgerForm} timeout={500} classNames="addFamilyForm" unmountOnExit appear exit>
          <AddLedgerForm
            childId={childId}
            childName={childData.name}
            parentName={this.props.user.id}
            toggleAddLedgerForm={this.toggleAddLedgerForm}
            updateLedger={this.updateLedger}
            ledgerData={ledgerData}
            clearLedger={this.clearLedger}
          />
        </CSSTransition>
        <div className="child-info d-flex flex-row justify-content-around align-items-center py-3 px-2 w-100">
          <img src={childData.photoURL} alt="child" className="ChildThumbnail child-parent-view-image"/>
          <div>
            <h2>{utils.firstName(childData.name)}</h2>
            <span className="badge">Balance: {balance}</span>
          </div>
        </div>
        <button className="btn btn-primary m-3" onClick={this.toggleAddLedgerForm} id="newItem"><i className="fas fa-plus-circle"></i> New Entry</button>
        <div className="child-ledger">
          {printLedger}
        </div>
      </div>
    );
  }
}

export default Child;
