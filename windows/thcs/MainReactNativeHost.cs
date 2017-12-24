#if CODEPUSH
using CodePush.ReactNative;
#endif
using ReactNative;
using ReactNative.Modules.Core;
using ReactNative.Shell;
using System.Collections.Generic;

namespace thcs
{
    class MainReactNativeHost : ReactNativeHost
    {
        public override string MainComponentName => "thcs";

#if !BUNDLE || DEBUG
        public override bool UseDeveloperSupport => true;
#else
        public override bool UseDeveloperSupport => false;
#endif

        protected override string JavaScriptMainModuleName => "index.windows";

        /*
#if BUNDLE
        protected override string JavaScriptBundleFile => "ms-appx:///ReactAssets/index.windows.bundle";
#endif*/

#if CODEPUSH
#if BUNDLE
        private CodePushReactPackage codePushReactPackage;
        protected override string JavaScriptBundleFile
        {
            get
            {
                //return "ms-appx:///ReactAssets/index.windows.bundle";
                string cpKey;
#if DEBUG
        cpKey = "YourDeployKey";
#else
                cpKey = "YourDeployKey";
#endif
                codePushReactPackage = new CodePushReactPackage(cpKey, this);
                return codePushReactPackage.GetJavaScriptBundleFile();
            }
        }
#endif
#else
        protected override string JavaScriptBundleFile
        {
            get
            {
                return "ms-appx:///ReactAssets/index.windows.bundle";
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
#if BUNDLE && CODEPUSH
                rpl.Add(codePushReactPackage);
#endif
                return rpl;
            }
        }

    }
}
