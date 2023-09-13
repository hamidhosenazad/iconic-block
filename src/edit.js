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
	RadioControl,
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
		height: 400,
	},
};

export default function Edit( { attributes, setAttributes } ) {
	const {
		alignment,
		url,
		label,
		linkRel,
		title,
		htmlAnchor,
		backgroundColor,
		iconColor,
		iconSize,
		modalOpen,
		suggestions = [],
		selectedIcon,
		searchInput,
		blank,
	} = attributes;

	const IconComponent = BootstrapIcons[ selectedIcon ];
	const setModalOpen = ( newVal ) => {
		setAttributes( { modalOpen: newVal } );
	};
	const onChangeAlignment = ( newAlignment ) => {
		setAttributes( { alignment: newAlignment } );
	};
	const onChangeUrl = ( newUrl ) => {
		setAttributes( { url: newUrl } );
	};
	const onChangeBlank = ( newBlank ) => {
		setAttributes( { blank: newBlank } );
	};
	const onChangeLabel = ( newLabel ) => {
		setAttributes( { label: newLabel } );
	};
	const onChangeRel = ( newLinkRel ) => {
		setAttributes( { linkRel: newLinkRel } );
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
	const onSearchInputChange = ( newSearchInput ) => {
		if ( newSearchInput === '' ) {
			setAttributes( { suggestions: [] } );
			setAttributes( { searchInput: newSearchInput } );
		} else {
			const filteredIcons = filterBootstrapIcons( newSearchInput );
			setAttributes( { suggestions: filteredIcons } );
			setAttributes( { searchInput: newSearchInput } );
		}
	};

	const filterBootstrapIcons = ( inputValue ) => {
		const filteredIcons = Object.keys( BootstrapIcons )
			.filter( ( iconName ) =>
				iconName.toLowerCase().includes( inputValue.toLowerCase() )
			)
			.map( ( iconName ) => ( {
				iconName,
				IconComponent: BootstrapIcons[ iconName ], // Get the icon component
			} ) );
		return filteredIcons;
	};

	const onChangeIcon = ( newIcon ) => {
		setAttributes( { selectedIcon: newIcon } );
	};
	if ( suggestions.length === 0 ) {
		setAttributes( { searchInput: '' } );
	}

	return (
		<>
			<InspectorControls group="settings">
				<PanelBody title={ __( 'Settings', 'iconic-block' ) }>
					<TextControl
						label={ __( 'Url', 'iconic-block' ) }
						value={ url }
						onChange={ onChangeUrl }
						help={ __( '', 'Iconic-block' ) }
					/>

					<RadioControl
						label="Open in a new tab?"
						selected={ blank }
						options={ [
							{ label: 'Yes', value: 'Yes' },
							{ label: 'No', value: 'No' },
						] }
						onChange={ ( value ) => onChangeBlank( value ) }
					/>

					<TextControl
						label={ __( 'Label', 'iconic-block' ) }
						value={ label }
						onChange={ onChangeLabel }
						help={ __(
							'Briefly describe the icon to help screen reader users.',
							'Iconic-block'
						) }
					/>

					<TextControl
						label={ __( 'Link rel', 'iconic-block' ) }
						value={ linkRel }
						onChange={ onChangeRel }
						help={ __(
							'Rel attribute for the icon',
							'Iconic-block'
						) }
					/>
					<TextControl
						label={ __( 'Title', 'iconic-block' ) }
						value={ title }
						onChange={ onChangeTitle }
						help={ __(
							'Describe the role of this icon on the page',
							'Iconic-block'
						) }
					/>
					<TextControl
						label={ __( 'HTML ANCHOR', 'iconic-block' ) }
						value={ htmlAnchor }
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
					<ToolbarButton onClick={ setModalOpen }>
						{ __( 'Replace Icon', 'icon-block' ) }
					</ToolbarButton>
				</ToolbarGroup>
			</BlockControls>
			<div
				{ ...useBlockProps( {
					className: `wp-block-iconic-block wp-block-iconic-block-align-${ alignment }`,
				} ) }
			>
				<IconComponent color={ iconColor } size={ iconSize } />
			</div>
			<Modal
				isOpen={ modalOpen }
				onRequestClose={ () => setModalOpen( false ) }
				style={ customStyles }
			>
				<div>
					<input
						type="text"
						placeholder="Search..."
						value={ searchInput }
						onChange={ ( e ) =>
							onSearchInputChange( e.target.value )
						}
					/>
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
					{ suggestions.length === 0 ? (
						<p
							style={ {
								position: 'absolute',
								top: '50%',
								left: '50%',
								transform: 'translate(-50%, -50%)',
								fontSize: '36px',
								color: 'rgba(0, 0, 0, 0.5)',
							} }
						>
							No icons to display
						</p>
					) : (
						suggestions.map( ( icon, index ) => (
							<div
								key={ index }
								style={ {
									flex: '0 0 33.33%',
									boxSizing: 'border-box',
									padding: '8px',
									border: '1px solid #fff',
								} }
								className="hover-icon"
								onClick={ () => {
									setModalOpen( false );
									onChangeIcon( icon.iconName );
								} }
								onKeyDown={ onChangeIcon }
								tabIndex={ 0 }
								role="button"
							>
								{ /* Render icon suggestions here */ }
								<icon.IconComponent
									color="#000"
									size={ iconSize }
								/>
								<p>{ icon.iconName }</p>
							</div>
						) )
					) }
				</div>
			</Modal>
		</>
	);
}
