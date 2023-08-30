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

import { EmojiSmile } from 'react-bootstrap-icons';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

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
	} = attributes;
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
				<EmojiSmile size={ iconSize } color="red" />
			</div>
		</>
	);
}
