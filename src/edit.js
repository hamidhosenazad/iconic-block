/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
	useBlockProps,
	BlockControls,
	AlignmentToolbar,
	InspectorControls,
	PanelColorSettings,
	ContrastChecker,
} from '@wordpress/block-editor';

import {
	PanelBody,
	TextControl,
	__experimentalDimensionControl as DimensionControl, // eslint-disable-line
	ToolbarButton,
	ToolbarGroup,
} from '@wordpress/components';

import * as BootstrapIcons from 'react-bootstrap-icons';

import Modal from 'react-modal';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
		backgroundColor: 'white',
		width: 600,
	},
};

export default function Edit( { attributes, setAttributes } ) {
	const {
		alignment,
		label,
		rel,
		title,
		htmlAnchor,
		backgroundColor,
		iconColor,
		rotate,
		iconSize,
		modalOpen = false,
	} = attributes;
	const setModalOpen = ( newVal ) => {
		setAttributes( { modalOpen: newVal } );
	};
	const onChangeAlignment = ( newAlignment ) => {
		setAttributes( { alignment: newAlignment } );
	};
	const onChangeLabel = ( newLabel ) => {
		setAttributes( { label: newLabel } );
	};
	const onChangeRel = ( newRel ) => {
		setAttributes( { rel: newRel } );
	};
	const onChangeTitle = ( newTitle ) => {
		setAttributes( { title: newTitle } );
	};
	const onChangeHtmlAnchor = ( newHtmlAnchor ) => {
		setAttributes( { htmlAnchor: newHtmlAnchor } );
	};
	const onBackgroundColorChange = ( newBackgroundColor ) => {
		setAttributes( { backgroundColor: newBackgroundColor } );
	};
	const onChangeIconColor = ( newIconColor ) => {
		setAttributes( { iconColor: newIconColor } );
	};
	const onChangeSize = ( newIconColor ) => {
		setAttributes( { iconSize: newIconColor } );
	};

	return (
		<>
			<InspectorControls group="settings">
				<PanelBody title={ __( 'Settings', 'iconic-block' ) }>
					<TextControl
						label={ __( 'Label', 'iconic-block' ) }
						value={ label || '' }
						onChange={ onChangeLabel }
						help={ __(
							'Briefly describe the icon to help screen reader users.',
							'Iconic-block'
						) }
					/>

					<TextControl
						label={ __( 'REL', 'iconic-block' ) }
						value={ rel || '' }
						onChange={ onChangeRel }
						help={ __(
							'Rel attribute for the icon',
							'Iconic-block'
						) }
					/>
					<TextControl
						label={ __( 'TITLE', 'iconic-block' ) }
						value={ title || '' }
						onChange={ onChangeTitle }
						help={ __(
							'Describe the role of this icon on the page',
							'Iconic-block'
						) }
					/>
					<TextControl
						label={ __( 'HTML ANCHOR', 'iconic-block' ) }
						value={ htmlAnchor || '' }
						onChange={ onChangeHtmlAnchor }
						help={ __(
							'Enter a word or two — without spaces — to make a unique web address just for this block, called an “anchor.” Then, you’ll be able to link directly to this section of your page',
							'Iconic-block'
						) }
					/>
				</PanelBody>
			</InspectorControls>

			<InspectorControls group="styles">
				<TextControl
					label={ __( 'Size', 'iconic-block' ) }
					value={ iconSize }
					onChange={ onChangeSize }
				/>
				<PanelColorSettings
					title={ __( 'Color', 'iconic-block' ) }
					initialOpen
					disableCustomColors={ false }
					colorSettings={ [
						{
							value: iconColor,
							onChange: onChangeIconColor,
							label: __( 'Icon Color', 'iconic-block' ),
						},
						{
							value: backgroundColor,
							onChange: onBackgroundColorChange,
							label: __( 'Background Color', 'iconic-block' ),
						},
					] }
				>
					<ContrastChecker
						iconColor={ iconColor }
						backgroundColor={ backgroundColor }
					/>
				</PanelColorSettings>
				<PanelBody></PanelBody>
			</InspectorControls>
			<BlockControls>
				<AlignmentToolbar
					value={ alignment }
					onChange={ onChangeAlignment }
				/>
				<ToolbarGroup>
					<ToolbarButton
						name="link"
						icon="admin-links"
						title={ __( 'Link', 'icon-block' ) }
					/>
				</ToolbarGroup>
				<ToolbarGroup>
					<ToolbarButton
						className={ `outermost-icon-block__rotate-button-${ rotate }` }
						icon="image-rotate-right"
						label={ __( 'Rotate', 'icon-block' ) }
						isPressed={ rotate }
					/>
				</ToolbarGroup>
				<ToolbarGroup>
					<ToolbarButton>
						{ __( 'Icon Library', 'icon-block' ) }
					</ToolbarButton>
				</ToolbarGroup>
			</BlockControls>
			<div
				{ ...useBlockProps( {
					className: `wp-block-iconic-block wp-block-iconic-block-align-${ alignment }`,
				} ) }
				title={ label }
			>
				<BootstrapIcons.HeartFill color="red" size={ 24 } />
			</div>
			<div className="App">
				<button onClick={ setModalOpen }>Open Modal</button>
				<Modal
					isOpen={ modalOpen }
					onRequestClose={ () => setModalOpen( false ) }
					style={ customStyles }
				>
					<div>
						<input type="text" placeholder="Search..." value="12" />
						<button
							onClick={ () => setModalOpen( false ) }
							style={ { float: 'right', marginRight: '10px' } }
						>
							X
						</button>
					</div>
					<div
						style={ {
							display: 'flex',
							flexWrap: 'wrap',
							paddingTop: '5%',
						} }
					>
						{ /* HeartFill */ }
						<div
							style={ {
								flexBasis: '25%',
								padding: '10px',
								textAlign: 'center',
							} }
						>
							<BootstrapIcons.HeartFill size={ 24 } />
							<div>HeartFill</div>
						</div>

						{ /* StarFill */ }
						<div
							style={ {
								flexBasis: '25%',
								padding: '10px',
								textAlign: 'center',
							} }
						>
							<BootstrapIcons.StarFill size={ 24 } />
							<div>StarFill</div>
						</div>

						{ /* BookFill */ }
						<div
							style={ {
								flexBasis: '25%',
								padding: '10px',
								textAlign: 'center',
							} }
						>
							<BootstrapIcons.BookFill size={ 24 } />
							<div>BookFill</div>
						</div>

						{ /* MusicPlayerFill */ }
						<div
							style={ {
								flexBasis: '25%',
								padding: '10px',
								textAlign: 'center',
							} }
						>
							<BootstrapIcons.MusicPlayerFill size={ 24 } />
							<div>MusicPlayerFill</div>
						</div>

						{ /* AlarmFill */ }
						<div
							style={ {
								flexBasis: '25%',
								padding: '10px',
								textAlign: 'center',
							} }
						>
							<BootstrapIcons.AlarmFill size={ 24 } />
							<div>AlarmFill</div>
						</div>

						{ /* CalendarFill */ }
						<div
							style={ {
								flexBasis: '25%',
								padding: '10px',
								textAlign: 'center',
							} }
						>
							<BootstrapIcons.CalendarFill size={ 24 } />
							<div>CalendarFill</div>
						</div>

						{ /* ChatFill */ }
						<div
							style={ {
								flexBasis: '25%',
								padding: '10px',
								textAlign: 'center',
							} }
						>
							<BootstrapIcons.ChatFill size={ 24 } />
							<div>ChatFill</div>
						</div>

						{ /* CameraVideoFill */ }
						<div
							style={ {
								flexBasis: '25%',
								padding: '10px',
								textAlign: 'center',
							} }
						>
							<BootstrapIcons.CameraVideoFill size={ 24 } />
							<div>CameraVideoFill</div>
						</div>

						{ /* FileEarmarkFill */ }
						<div
							style={ {
								flexBasis: '25%',
								padding: '10px',
								textAlign: 'center',
							} }
						>
							<BootstrapIcons.FileEarmarkFill size={ 24 } />
							<div>FileEarmarkFill</div>
						</div>

						{ /* LockFill */ }
						<div
							style={ {
								flexBasis: '25%',
								padding: '10px',
								textAlign: 'center',
							} }
						>
							<BootstrapIcons.LockFill size={ 24 } />
							<div>LockFill</div>
						</div>

						{ /* UnlockFill */ }
						<div
							style={ {
								flexBasis: '25%',
								padding: '10px',
								textAlign: 'center',
							} }
						>
							<BootstrapIcons.UnlockFill size={ 24 } />
							<div>UnlockFill</div>
						</div>

						{ /* PlayFill */ }
						<div
							style={ {
								flexBasis: '25%',
								padding: '10px',
								textAlign: 'center',
							} }
						>
							<BootstrapIcons.PlayFill size={ 24 } />
							<div>PlayFill</div>
						</div>

						{ /* PauseFill */ }
						<div
							style={ {
								flexBasis: '25%',
								padding: '10px',
								textAlign: 'center',
							} }
						>
							<BootstrapIcons.PauseFill size={ 24 } />
							<div>PauseFill</div>
						</div>

						{ /* StopFill */ }
						<div
							style={ {
								flexBasis: '25%',
								padding: '10px',
								textAlign: 'center',
							} }
						>
							<BootstrapIcons.StopFill size={ 24 } />
							<div>StopFill</div>
						</div>

						{ /* RecordFill */ }
						<div
							style={ {
								flexBasis: '25%',
								padding: '10px',
								textAlign: 'center',
							} }
						>
							<BootstrapIcons.RecordFill size={ 24 } />
							<div>RecordFill</div>
						</div>

						{ /* SkipStartFill */ }
						<div
							style={ {
								flexBasis: '25%',
								padding: '10px',
								textAlign: 'center',
							} }
						>
							<BootstrapIcons.SkipStartFill size={ 24 } />
							<div>SkipStartFill</div>
						</div>

						{ /* SkipEndFill */ }
						<div
							style={ {
								flexBasis: '25%',
								padding: '10px',
								textAlign: 'center',
							} }
						>
							<BootstrapIcons.SkipEndFill size={ 24 } />
							<div>SkipEndFill</div>
						</div>

						{ /* ArrowUpCircleFill */ }
						<div
							style={ {
								flexBasis: '25%',
								padding: '10px',
								textAlign: 'center',
							} }
						>
							<BootstrapIcons.ArrowUpCircleFill size={ 24 } />
							<div>ArrowUpCircleFill</div>
						</div>

						{ /* ArrowDownCircleFill */ }
						<div
							style={ {
								flexBasis: '25%',
								padding: '10px',
								textAlign: 'center',
							} }
						>
							<BootstrapIcons.ArrowDownCircleFill size={ 24 } />
							<div>ArrowDownCircleFill</div>
						</div>

						{ /* ArrowLeftCircleFill */ }
						<div
							style={ {
								flexBasis: '25%',
								padding: '10px',
								textAlign: 'center',
							} }
						>
							<BootstrapIcons.ArrowLeftCircleFill size={ 24 } />
							<div>ArrowLeftCircleFill</div>
						</div>

						{ /* ArrowRightCircleFill */ }
						<div
							style={ {
								flexBasis: '25%',
								padding: '10px',
								textAlign: 'center',
							} }
						>
							<BootstrapIcons.ArrowRightCircleFill size={ 24 } />
							<div>ArrowRightCircleFill</div>
						</div>

						{ /* Search */ }
						<div
							style={ {
								flexBasis: '25%',
								padding: '10px',
								textAlign: 'center',
							} }
						>
							<BootstrapIcons.AirplaneEnginesFill size={ 24 } />
							<div>Search</div>
						</div>

						{ /* Add more icons here */ }
					</div>
				</Modal>
			</div>
		</>
	);
}
