using CodePush.ReactNative;
using ReactNative;
using ReactNative.Modules.Core;
using ReactNative.Shell;
using System.Collections.Generic;

namespace thcs
{
    class MainReactNativeHost : ReactNativeHost
    {
        private CodePushReactPackage codePushReactPackage;
        public MainReactNativeHost()
        {
            string cpKey;
#if DEBUG
            cpKey = "YourDeployKey";
#else
                cpKey = "YourDeployKey";
#endif
            codePushReactPackage = new CodePushReactPackage(cpKey, this);
        }

        public override string MainComponentName => "thcs";

#if !BUNDLE || DEBUG
        public override bool UseDeveloperSupport => true;
#else
        public override bool UseDeveloperSupport => false;
#endif

        protected override string JavaScriptMainModuleName => "index.windows";

#if BUNDLE
        protected override string JavaScriptBundleFile
        {
            get
            {
                //return "ms-appx:///ReactAssets/index.windows.bundle";
                return codePushReactPackage.GetJavaScriptBundleFile();
            }
        }
#endif

        protected override List<IReactPackage> Packages
        {
            get
            {
                var rpl = new List<IReactPackage>
                {
                    new MainReactPackage(),
                    new ThcsReactPackage()
                };
//#if BUNDLE
                rpl.Add(codePushReactPackage);
//#endif
                return rpl;
            }
        }

    }
}
