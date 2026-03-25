
/**
 * @author pierreconvert
 *
 */
import com.alphaventor.website.AlphaWebsite;
import com.s8.meta.env.modular.S8ModuleDescriptor;



@S8ModuleDescriptor(def = AlphaWebsite.class)
module com.alphaventor.website {
	
	exports com.alphaventor.website;
	
	requires transitive com.s8.meta.env;
}