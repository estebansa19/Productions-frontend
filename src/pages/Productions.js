import React from 'react';
import ProductionsNavigation from '../components/ProductionsNavigation'

class Productions extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      error: null,
      production_kind: null,
      refresh: props.location.state && props.location.state.refresh ? true : false
    }
  }

  changeProductionKind = (id) => {
    let kindId = parseInt(id)
    this.setState({ production_kind: kindId })
  }

  render() {
    return(
      <React.Fragment>
        <ProductionsNavigation
          change_kind={this.changeProductionKind}
          production_kind={this.state.production_kind}
          refresh={this.state.refresh}
        />
      </React.Fragment>
    )
  }
}

export default Productions;