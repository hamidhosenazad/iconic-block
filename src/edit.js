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
} from '@wordpress/block-editor';

import { PanelBody, TextControl } from '@wordpress/components';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	const { alignment, label } = attributes;
	const onChangeAlignment = ( newAlignment ) => {
		setAttributes( { alignment: newAlignment } );
	};
	const onChangeLabel = ( newLabel ) => {
		setAttributes( { label: newLabel } );
	};
	return (
		<>
			<InspectorControls>
				<PanelBody>
					<TextControl
						label={ __( 'Label', 'iconic-block' ) }
						value={ label }
						onChange={ onChangeLabel }
						help={ __(
							'Briefly describe the icon to help screen reader users.',
							'Iconic-block'
						) }
					/>
				</PanelBody>
			</InspectorControls>

			<BlockControls>
				<AlignmentToolbar
					value={ alignment }
					onChange={ onChangeAlignment }
				/>
			</BlockControls>
			<div
				{ ...useBlockProps( {
					className: `wp-block-iconic-block wp-block-iconic-block-align-${ alignment }`,
				} ) }
				title={ label }
			>
				<p>{ __( 'Pick an icon from the library', 'iconic-block' ) }</p>
				<button className="wp-block-iconic-block-button">
					{ __( 'Icon Library', 'iconic-block' ) }
				</button>
			</div>
		</>
	);
}
