
/**
 * @author pierreconvert
 *
 */
import com.s8.meta.modular.S8ModuleDescriptor;
import com.alphaventor.website.AlphaWebsite;



@S8ModuleDescriptor(def = AlphaWebsite.class)
module com.alphaventor.website {
	
	exports com.alphaventor.website;
	
	requires transitive com.s8.meta;
}