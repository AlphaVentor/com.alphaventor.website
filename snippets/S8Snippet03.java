
public class S8Snippet02 {

	
	/**
	 * 
	 * @param args
	 */
	public void boot(S8AsyncFlow flow) {
		flow.doBlock(()->{
			System.out.println("Hello World");
		});
	}
}
