
public class SiDemo02 {
	
	public SiliconEngine ng;
	
	public SiDemo02(SiliconEngine ng) {
		this.ng = ng;
	}

	public void runTask() {
		ng.pushAsyncTask(new AsyncSiTask() {
			
			@Override
			public void run() {
				/* Do some I/O operations here */
			}
			
			@Override
			public MthProfile profile() {
				return MthProfile.IO_SSD;
			}
			
			@Override
			public String describe() {
				return "Loading file";
			}
		});
	}
	
	
	public static void appendWatcher(SiliconEngine ng) {
		ng.pushWatchTask(new WatchSiTask() {

			@Override
			public String describe() {
				return "Update";
			}

			@Override
			public WatchSiTask run() {
				/* some blocking function call here */
				
				/* relaunch watcher by sending it again */
				return this;
			}
		});
	}
}