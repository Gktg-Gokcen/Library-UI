// import { render } from 'react-dom';
// import React, { Component } from 'react';
// import { Dialog } from 'primereact/dialog';
// import { Button } from 'primereact/button';

// let resolve;
// const defaultProps = {
//   title: 'Onay',
//   message: 'Emin misiniz?',
// };
// class Confirm extends Component {
//   static create(props = {}) {
//     const containerElement = document.createElement('div');
//     document.body.appendChild(containerElement);
//     return render(<Confirm createConfirmProps={props} />, containerElement);
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
//     const { message, title, width, acceptMessage, cancelMessage } = showConfirmProps;
//     return (
//       <Dialog header={title || defaultProps.title} visible={isOpen} modal baseZIndex={1000001} style={{ width: width || '500px' }} onHide={this.handleCancel}
//         footer={(
//           <div>
//             <Button label={cancelMessage || "İptal"} icon="pi pi-times" onClick={this.handleCancel} className="p-button-text" />
//             <Button label={acceptMessage || "Evet"} icon="pi pi-check" onClick={this.handleConfirm} autoFocus />
//           </div>
//         )}
//       >
//         <div className="p-mr-3 p-mt-3 p-grid">
//           <div className='p-col-1 p-pb-0'>
//             <div className='box'>
//               <i className={width ? '' : "pi pi-exclamation-triangle"} style={{ fontSize: '2rem' }} />
//             </div>
//           </div>
//           <div className='p-col'>
//             <div className='box '>
//               <span>{message || defaultProps.message}</span>
//             </div>
//           </div>
//         </div>
//       </Dialog>
//     );
//   }
// }

// export default Confirm;
