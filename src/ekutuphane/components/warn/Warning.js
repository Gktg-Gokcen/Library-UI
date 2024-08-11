// import React, { Component } from 'react';
// import { render } from 'react-dom';
// import { Dialog } from 'primereact/dialog';
// import { Button } from 'primereact/button';

// let resolve;
// const defaultProps = {
//   title: 'Uyarı!',
//   message: 'Uyarı!',
// };
// class Warning extends Component {
//   static create(props = {}) {
//     const containerElement = document.createElement('div');
//     document.body.appendChild(containerElement);
//     return render(<Warning createConfirmProps={props} />, containerElement);
//   }

//   constructor() {
//     super();

//     this.state = {
//       isOpen: false,
//       showConfirmProps: {},
//     };

//     this.handleCancel = this.handleCancel.bind(this);
//     this.handleConfirm = this.handleConfirm.bind(this);
//     this.show = this.show.bind(this);
//   }

//   handleCancel() {
//     this.setState({ isOpen: false });
//     resolve(false);
//   }

//   handleConfirm() {
//     this.setState({ isOpen: false });
//     resolve(true);
//   }

//   show(props = {}) {
//     const showConfirmProps = { ...this.props.createConfirmProps, ...props };
//     this.setState({ isOpen: true, showConfirmProps });
//     return new Promise(res => {
//       resolve = res;
//     });
//   }

//   render() {
//     const { isOpen, showConfirmProps } = this.state;
//     const { message, title } = showConfirmProps;
//     return (
//       <Dialog header={title || defaultProps.title} visible={isOpen} modal baseZIndex={1000001} style={{ width: '350px' }} onHide={this.handleCancel}
//         footer={(
//           <div>
//             <Button label="Tamam" icon="pi pi-check" className="p-button-text" onClick={this.handleConfirm} autoFocus />
//           </div>
//         )}
//       >
//         <div className="p-fluid p-grid floatlabel-demo p-mt-2">
//           <div className="p-col-2">
//             <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} ></i>
//           </div>
//           <div className="p-col-10">
//             {message?.map(val => {
//               return (
//                 <div>{'* ' + val || defaultProps.message}</div>
//               );
//             })}
//           </div>
//         </div>


//       </Dialog>
//     );
//   }
// }

// export default Warning;
